import { processWebhook } from "corsair";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { corsair } from "@/server/corsair";

export async function POST(request: NextRequest) {
  try {
    const headers: Record<string, string> = {};
    request.headers.forEach((value, key) => {
      headers[key] = value;
    });

    const body = request.headers.get("content-type")?.includes("application/json")
      ? await request.json()
      : await request.text();

    // Retrieve tenantId from query params (multi-tenant scoping)
    const tenantId = new URL(request.url).searchParams.get("tenantId") ?? undefined;

    console.log(`[Webhook Route] Processing incoming webhook for tenant: ${tenantId}`);

    const result = await processWebhook(corsair, headers, body, { tenantId });

    if (!result.response) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    return NextResponse.json(result.response);
  } catch (error: any) {
    console.error("[Webhook Route Error]", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process webhook" },
      { status: 500 }
    );
  }
}
