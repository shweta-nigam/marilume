import { auth } from "@/lib/auth";
import { corsair } from "@/server/corsair";
import { generateOAuthUrl } from "corsair/oauth";
import { ensureUserTenantProvisioned } from "@/services/tenant.service";
import { NextResponse } from "next/server";

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

  // Ensure tenant is provisioned and retrieve tenant.id
  const tenantId = await ensureUserTenantProvisioned(session.user.id);

  const redirectUri = process.env.GOOGLE_GMAIL_REDIRECT_URI!;

  console.log(`[Gmail Connect] Generating OAuth URL for tenant: ${tenantId}, redirectUri: ${redirectUri}`);

  // Generate OAuth authorization URL natively via Corsair
  const { url } = await generateOAuthUrl(corsair, "gmail", {
    tenantId,
    redirectUri,
  });

  return NextResponse.redirect(url);
}

