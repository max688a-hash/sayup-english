import { createFileRoute } from "@tanstack/react-router";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

// Unified Apple purchase intake: {signedTransaction} = app-side report,
// {signedPayload} = App Store Server Notifications V2 envelope.
export const Route = createFileRoute("/api/public/apple-purchase")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { signedTransaction?: string; signedPayload?: string };
        try {
          body = await request.json();
        } catch {
          return json({ status: "invalid" }, 400);
        }
        try {
          const { handleApplePurchasePost } = await import("@/lib/apple-purchase.server");
          return json(await handleApplePurchasePost(body));
        } catch (error) {
          console.error(error);
          return json({ status: "error" }, 500);
        }
      },
    },
  },
});
