import { auth } from "@/lib/auth";
import { corsair } from "@/server/corsair";
import { generateOAuthUrl } from "corsair/oauth";
import { ensureUserTenantProvisioned } from "@/services/tenant.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Ensure tenant is provisioned and retrieve tenant.id
    const tenantId = await ensureUserTenantProvisioned(session.user.id);

    // Reuse GMAIL redirect URI which is already registered in Google Console
    const redirectUri = process.env.GOOGLE_GMAIL_REDIRECT_URI!;

    console.log(`[Calendar Connect] Generating OAuth URL for tenant: ${tenantId}, redirectUri: ${redirectUri}`);

    // Generate OAuth authorization URL natively via Corsair for 'googlecalendar'
    const { url } = await generateOAuthUrl(corsair, "googlecalendar", {
      tenantId,
      redirectUri,
    });

    return NextResponse.redirect(url);
  } catch (error: any) {
    console.error("[Calendar Connect Error]", error);
    return NextResponse.json(
      { error: "Failed to generate authorization URL", details: error.message },
      { status: 500 }
    );
  }
}
