"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ensureUserTenantProvisioned } from "@/services/tenant.service";
import { corsair } from "@/server/corsair";

export async function sendReply(threadId: string, replyText: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const tenantId = await ensureUserTenantProvisioned(session.user.id);

    // Fetch original thread messages to build threading headers
    const messages = await corsair
      .withTenant(tenantId)
      .gmail
      .db
      .messages
      .search({
        data: {
          threadId: threadId,
        },
      });

    if (messages.length === 0) {
      return { success: false, error: "Thread not found or has no messages" };
    }

    // Sort to identify the original (first) and latest messages
    const sortedMessages = [...messages].sort(
      (a: any, b: any) =>
        new Date(a.data?.createdAt ?? 0).getTime() -
        new Date(b.data?.createdAt ?? 0).getTime()
    );

    const firstMessage = sortedMessages[0];
    const latestMessage = sortedMessages[sortedMessages.length - 1];

    const getHeader = (msg: any, name: string) => {
      return msg?.data?.payload?.headers?.find(
        (h: any) => h.name.toLowerCase() === name.toLowerCase()
      )?.value;
    };

    // Construct headers
    const originalFrom = getHeader(latestMessage, "from") || getHeader(firstMessage, "from") || "";
    const replyTo = getHeader(latestMessage, "reply-to") || originalFrom;

    const originalSubject = getHeader(firstMessage, "subject") || getHeader(latestMessage, "subject") || "No Subject";
    const subject = originalSubject.toLowerCase().startsWith("re:")
      ? originalSubject
      : `Re: ${originalSubject}`;

    const originalMessageId = getHeader(latestMessage, "message-id") || getHeader(firstMessage, "message-id");

    // Build RFC 2822 compliant email
    const emailLines: string[] = [];
    emailLines.push(`To: ${replyTo}`);
    emailLines.push(`Subject: ${subject}`);
    
    if (originalMessageId) {
      emailLines.push(`In-Reply-To: ${originalMessageId}`);
      emailLines.push(`References: ${originalMessageId}`);
    }

    emailLines.push('Content-Type: text/plain; charset="UTF-8"');
    emailLines.push("");
    emailLines.push(replyText);

    const emailRaw = emailLines.join("\r\n");

    // Base64url encode helper
    const base64UrlEncode = (str: string) => {
      return Buffer.from(str)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    };

    const encodedRaw = base64UrlEncode(emailRaw);

    // Send the email via Corsair API
    await corsair
      .withTenant(tenantId)
      .gmail
      .api
      .messages
      .send({
        raw: encodedRaw,
        threadId: threadId,
      });

    return { success: true };
  } catch (error: any) {
    console.error("[sendReply action error]", error);
    return { success: false, error: error.message || "Failed to send email" };
  }
}

export async function markThreadAsRead(threadId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const tenantId = await ensureUserTenantProvisioned(session.user.id);

    await corsair
      .withTenant(tenantId)
      .gmail
      .api
      .threads
      .modify({
        id: threadId,
        removeLabelIds: ["UNREAD"],
      });

    return { success: true };
  } catch (error: any) {
    console.error("[markThreadAsRead action error]", error);
    return { success: false, error: error.message || "Failed to mark as read" };
  }
}

