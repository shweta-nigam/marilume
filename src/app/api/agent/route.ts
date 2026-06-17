import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { runAssistant } from "@/services/agent.service";
import { ensureUserTenantProvisioned } from "@/services/tenant.service";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body = await req.json();

    if (!body?.message?.trim()) {
      return NextResponse.json(
        {
          error: "Message is required",
        },
        {
          status: 400,
        }
      );
    }

    // Resolve tenant
    const tenantId =
      await ensureUserTenantProvisioned(
        session.user.id
      );

    console.log(
      `[Agent Route] Running assistant for tenant: ${tenantId}`
    );

    let prompt = body.message;
    if (body.selectedEmail) {
      prompt = `[Context - Selected Email:
Sender: ${body.selectedEmail.sender}
Subject: ${body.selectedEmail.subject}
Snippet: ${body.selectedEmail.snippet}
ID: ${body.selectedEmail.id}]

User Message: ${body.message}`;
    }

    const response = await runAssistant(
      tenantId,
      prompt
    );

    return NextResponse.json({
      success: true,
      response,
    });
  } catch (error) {
    console.error(
      "[AGENT_ROUTE_ERROR]",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}