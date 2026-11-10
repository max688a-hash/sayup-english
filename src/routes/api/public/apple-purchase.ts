import { createFileRoute } from "@tanstack/react-router";
import { AppleRequestError } from '@/lib/apple-request-error';

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
          const value: unknown = await request.json();
          if (!value || typeof value !== 'object' || Array.isArray(value)) return json({ status: 'invalid' }, 400);
          body = value;
        } catch {
          return json({ status: "invalid" }, 400);
        }
        try {
          const { handleApplePurchasePost } = await import("@/lib/apple-purchase.server");
          const result = await handleApplePurchasePost(body);
          return json(result, result.status === 'invalid' ? 400 : 200);
        } catch (error) {
          if (error instanceof AppleRequestError) return json({ status: 'invalid' }, 400);
          console.error(error);
          return json({ status: "error" }, 500);
        }
      },
    },
  },
});
