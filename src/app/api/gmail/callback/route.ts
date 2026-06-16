import { corsair } from "@/server/corsair";
import { processOAuthCallback } from "corsair/oauth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code || !state) {
    return Response.json(
      { error: "Missing authorization code or state" },
      { status: 400 }
    );
  }

  try {
    const redirectUri = process.env.GOOGLE_GMAIL_REDIRECT_URI!;

    console.log("[Gmail Callback] Exchanging code via Corsair processOAuthCallback");

    // Let Corsair process the callback, exchange code, and store credentials
    const result = await processOAuthCallback(corsair, {
      code,
      state,
      redirectUri,
    });

    console.log(`[Gmail Callback] Connected successfully for plugin: ${result.plugin}, tenant: ${result.tenantId}`);

    return Response.redirect(new URL("/dashboard", request.url));
  } catch (error: any) {
    console.error("[Gmail Callback] OAuth callback exchange failed:", error);
    return Response.json(
      { error: "OAuth callback failed", details: error.message },
      { status: 500 }
    );
  }
}