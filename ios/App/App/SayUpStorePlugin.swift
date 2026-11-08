import Foundation
import Capacitor
import StoreKit
import UIKit

/// Native StoreKit 2 bridge for SayUp auto-renewable subscriptions.
/// JS side: src/lib/iap.ts (plugin name "SayUpStore").
@objc(SayUpStorePlugin)
public class SayUpStorePlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "SayUpStorePlugin"
    public let jsName = "SayUpStore"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "getProducts", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "purchase", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "restore", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getEntitlements", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "manageSubscriptions", returnType: CAPPluginReturnPromise),
    ]

    private var updatesTask: Task<Void, Never>?

    override public func load() {
        NSLog("[SayUpStore] StoreKit 2 plugin registered")
        // Finish transactions that complete outside the purchase flow (Ask to Buy, renewals, other devices).
        updatesTask = Task.detached { [weak self] in
            for await result in Transaction.updates {
                guard case .verified(let tx) = result else { continue }
                await tx.finish()
                guard let self = self else { return }
                let entitlements = await self.currentEntitlements()
                self.notifyListeners("entitlementsChanged", data: ["entitlements": entitlements])
            }
        }
    }

    deinit { updatesTask?.cancel() }

    /// Rejects a call. The Capacitor 8 binary framework is built with Swift 6.2 and hides
    /// `CAPPluginCall.reject` from older compilers (gated by `$NonescapableTypes`), so on
    /// Xcode < 26 we invoke the same `@objc dynamic` method through its selector.
    private func fail(_ call: CAPPluginCall, _ message: String, _ code: String, _ error: Error? = nil) {
        #if compiler(>=6.2)
        fail(call, message, code, error)
        #else
        typealias RejectFn = @convention(c) (AnyObject, Selector, NSString, NSString?, NSError?, NSDictionary?) -> Void
        let sel = NSSelectorFromString("reject::::")
        guard call.responds(to: sel) else { return }
        let fn = unsafeBitCast(call.method(for: sel), to: RejectFn.self)
        fn(call, sel, message as NSString, code as NSString, error.map { $0 as NSError }, nil)
        #endif
    }

    @objc func getProducts(_ call: CAPPluginCall) {
        let ids = call.getArray("productIds", []).compactMap { $0 as? String }
        Task {
            do {
                let products = try await Product.products(for: ids)
                let list: [JSObject] = products.map { p in
                    var period: JSObject = [:]
                    if let sp = p.subscription?.subscriptionPeriod {
                        period = ["unit": Self.unitName(sp.unit), "value": sp.value]
                    }
                    return [
                        "id": p.id,
                        "displayName": p.displayName,
                        "description": p.description,
                        "displayPrice": p.displayPrice,
                        "price": NSDecimalNumber(decimal: p.price).doubleValue,
                        "currencyCode": p.priceFormatStyle.currencyCode,
                        "period": period,
                    ]
                }
                call.resolve(["products": list])
            } catch {
                fail(call, "Failed to load products: \(error.localizedDescription)", "PRODUCTS_FAILED", error)
            }
        }
    }

    @objc func purchase(_ call: CAPPluginCall) {
        let productId = call.getString("productId", "")
        guard !productId.isEmpty else {
            fail(call, "productId is required", "BAD_ARGS"); return
        }
        Task {
            do {
                guard let product = try await Product.products(for: [productId]).first else {
                    fail(call, "Product not found: \(productId)", "PRODUCT_NOT_FOUND"); return
                }
                var options: Set<Product.PurchaseOption> = []
                if let uuid = UUID(uuidString: call.getString("appAccountToken", "")) {
                    options.insert(.appAccountToken(uuid))
                }
                let result = try await product.purchase(options: options)
                switch result {
                case .success(let verification):
                    switch verification {
                    case .verified(let tx):
                        await tx.finish()
                        call.resolve([
                            "state": "purchased",
                            "transaction": Self.transactionJSON(tx, jws: verification.jwsRepresentation),
                            "entitlements": await currentEntitlements(),
                        ])
                    case .unverified(_, let error):
                        fail(call, "Transaction failed verification: \(error.localizedDescription)", "UNVERIFIED")
                    }
                case .userCancelled:
                    call.resolve(["state": "cancelled"])
                case .pending:
                    call.resolve(["state": "pending"])
                @unknown default:
                    call.resolve(["state": "unknown"])
                }
            } catch {
                fail(call, "Purchase failed: \(error.localizedDescription)", "PURCHASE_FAILED", error)
            }
        }
    }

    @objc func restore(_ call: CAPPluginCall) {
        Task {
            do {
                try await AppStore.sync()
                call.resolve(["entitlements": await currentEntitlements()])
            } catch {
                fail(call, "Restore failed: \(error.localizedDescription)", "RESTORE_FAILED", error)
            }
        }
    }

    @objc func getEntitlements(_ call: CAPPluginCall) {
        Task { call.resolve(["entitlements": await currentEntitlements()]) }
    }

    @objc func manageSubscriptions(_ call: CAPPluginCall) {
        Task { @MainActor in
            let scenes = UIApplication.shared.connectedScenes
            guard let scene = (scenes.first { $0.activationState == .foregroundActive } ?? scenes.first) as? UIWindowScene else {
                fail(call, "No active window scene", "NO_SCENE"); return
            }
            do {
                try await AppStore.showManageSubscriptions(in: scene)
                call.resolve()
            } catch {
                fail(call, "Could not open subscription management: \(error.localizedDescription)", "MANAGE_FAILED", error)
            }
        }
    }

    // MARK: - Helpers

    private func currentEntitlements() async -> [JSObject] {
        var list: [JSObject] = []
        for await result in Transaction.currentEntitlements {
            guard case .verified(let tx) = result else { continue }
            guard tx.productType == .autoRenewable, tx.revocationDate == nil else { continue }
            if let exp = tx.expirationDate, exp <= Date() { continue }
            list.append(Self.transactionJSON(tx, jws: result.jwsRepresentation))
        }
        return list
    }

    private static func transactionJSON(_ tx: Transaction, jws: String) -> JSObject {
        var obj: JSObject = [
            "productId": tx.productID,
            "transactionId": String(tx.id),
            "originalTransactionId": String(tx.originalID),
            "purchaseDate": tx.purchaseDate.timeIntervalSince1970 * 1000,
            "environment": environmentName(tx),
            "jws": jws,
        ]
        if let exp = tx.expirationDate { obj["expiresDate"] = exp.timeIntervalSince1970 * 1000 }
        if let token = tx.appAccountToken { obj["appAccountToken"] = token.uuidString }
        return obj
    }

    private static func environmentName(_ tx: Transaction) -> String {
        if #available(iOS 16.0, *) {
            switch tx.environment {
            case .production: return "Production"
            case .sandbox: return "Sandbox"
            case .xcode: return "Xcode"
            default: return "Unknown"
            }
        }
        return Bundle.main.appStoreReceiptURL?.lastPathComponent == "sandboxReceipt" ? "Sandbox" : "Production"
    }

    private static func unitName(_ unit: Product.SubscriptionPeriod.Unit) -> String {
        switch unit {
        case .day: return "day"
        case .week: return "week"
        case .month: return "month"
        case .year: return "year"
        @unknown default: return "unknown"
        }
    }
}
