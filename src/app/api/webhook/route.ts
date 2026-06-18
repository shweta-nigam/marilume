import { processWebhook } from "corsair";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { corsair } from "@/server/corsair";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  let loggedId: string | null = null;
  let tenantId = new URL(request.url).searchParams.get("tenantId") ?? undefined;
  
  try {
    const headers: Record<string, string> = {};
    request.headers.forEach((value, key) => {
      headers[key] = value;
    });

    const body = request.headers.get("content-type")?.includes("application/json")
      ? await request.json()
      : await request.text();

    // Decode Pub/Sub data to retrieve emailAddress and resolve tenantId if not provided
    let emailAddress = "";
    if (body && typeof body === "object") {
      const dataBase64 = (body as any).message?.data;
      if (dataBase64) {
        try {
          const decoded = JSON.parse(Buffer.from(dataBase64, "base64").toString("utf-8"));
          emailAddress = decoded.emailAddress || "";
        } catch (err) {
          console.error("Failed to decode Pub/Sub data:", err);
        }
      }
    }

    if (!tenantId && emailAddress) {
      const emailAccount = await prisma.emailAccount.findFirst({
        where: {
          emailAddress: {
            equals: emailAddress,
            mode: "insensitive",
          },
        },
        include: {
          user: true,
        },
      });
      if (emailAccount?.user?.tenantId) {
        tenantId = emailAccount.user.tenantId;
        console.log(`[Webhook Route] Resolved tenantId ${tenantId} for email ${emailAddress} via EmailAccount`);
      } else {
        const user = await prisma.user.findFirst({
          where: {
            email: {
              equals: emailAddress,
              mode: "insensitive",
            },
          },
        });
        if (user?.tenantId) {
          tenantId = user.tenantId;
          console.log(`[Webhook Route] Resolved tenantId ${tenantId} for email ${emailAddress} via User table`);
        }
      }
    }

    console.log(`[Webhook Route] Processing incoming webhook for tenant: ${tenantId}`);

    // Log incoming webhook into WebhookLog table
    const logRecord = await prisma.webhookLog.create({
      data: {
        eventType: "incoming_webhook",
        payload: JSON.parse(JSON.stringify({
          tenantId: tenantId ?? null,
          emailAddress,
          headers,
          body: typeof body === "string" ? body : body,
        })),
      },
    });
    loggedId = logRecord.id;

    const result = await processWebhook(corsair, headers, body, { tenantId });

    // Update log with results
    await prisma.webhookLog.update({
      where: { id: loggedId },
      data: {
        eventType: `processed_webhook:${result.plugin || "none"}:${result.action || "none"}`,
        payload: JSON.parse(JSON.stringify({
          tenantId: tenantId ?? null,
          emailAddress,
          headers,
          body: typeof body === "string" ? body : body,
          result: {
            plugin: result.plugin,
            action: result.action,
            response: result.response,
          },
        })),
      },
    });

    if (!result.response) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    return NextResponse.json(result.response);
  } catch (error: any) {
    console.error("[Webhook Route Error]", error);
    
    if (loggedId) {
      await prisma.webhookLog.update({
        where: { id: loggedId },
        data: {
          eventType: "webhook_error",
          payload: JSON.parse(JSON.stringify({
            tenantId: tenantId ?? null,
            error: error.message || String(error),
          })),
        },
      }).catch(err => console.error("Failed to update error log:", err));
    } else {
      await prisma.webhookLog.create({
        data: {
          eventType: "webhook_error",
          payload: JSON.parse(JSON.stringify({
            tenantId: tenantId ?? null,
            error: error.message || String(error),
          })),
        },
      }).catch(err => console.error("Failed to create error log:", err));
    }

    return NextResponse.json(
      { success: false, error: error.message || "Failed to process webhook" },
      { status: 500 }
    );
  }
}
