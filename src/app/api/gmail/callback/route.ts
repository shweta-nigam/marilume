import { google } from "googleapis";
import { auth } from "@/lib/auth";
import { setupCorsair } from "corsair";
import { corsair } from "@/server/corsair";
import { ensureUserTenantProvisioned } from "@/services/tenant.service";

export async function GET(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session || !session.user) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return Response.json(
      { error: "Missing authorization code" },
      { status: 400 }
    );
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_GMAIL_REDIRECT_URI
  );

  const { tokens } = await oauth2Client.getToken(code);
  console.log("GMAIL TOKENS FOR USER", session.user.id, ":", tokens);

  // Ensure tenant is provisioned first
  const userId = session.user.id;
  await ensureUserTenantProvisioned(userId);

  // Setup/link credentials in Corsair
  const gmailCreds: Record<string, string> = {};
  const calCreds: Record<string, string> = {};

  if (tokens.access_token) {
    gmailCreds.access_token = tokens.access_token;
    calCreds.access_token = tokens.access_token;
  }
  if (tokens.refresh_token) {
    gmailCreds.refresh_token = tokens.refresh_token;
    calCreds.refresh_token = tokens.refresh_token;
  }
  if (tokens.expiry_date) {
    const expiresSec = String(Math.floor(tokens.expiry_date / 1000));
    gmailCreds.expires_at = expiresSec;
    calCreds.expires_at = expiresSec;
  }

  const credentials: Record<string, Record<string, string>> = {};
  if (Object.keys(gmailCreds).length > 0) {
    credentials.gmail = gmailCreds;
  }
  if (Object.keys(calCreds).length > 0) {
    credentials.googlecalendar = calCreds;
  }

  if (Object.keys(credentials).length > 0) {
    console.log(`Updating Corsair setup with Gmail callback tokens for tenant: ${userId}`);
    await setupCorsair(corsair, {
      tenantId: userId,
      credentials,
    });
  }

  return Response.redirect(
    new URL("/dashboard", request.url)
  );
}