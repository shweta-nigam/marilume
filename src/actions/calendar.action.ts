"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ensureUserTenantProvisioned } from "@/services/tenant.service";
import {
  createEvent,
  updateEvent,
  deleteEvent,
} from "@/services/calendar.service";

export async function createCalendarEventAction(payload: {
  summary: string;
  start: string;
  end: string;
  description?: string;
  location?: string;
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const tenantId = await ensureUserTenantProvisioned(session.user.id);
    await createEvent(tenantId, payload);

    return { success: true };
  } catch (error: any) {
    console.error("[createCalendarEventAction Error]", error);
    return { success: false, error: error.message || "Failed to create event" };
  }
}

export async function updateCalendarEventAction(
  eventId: string,
  updates: Record<string, unknown>
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const tenantId = await ensureUserTenantProvisioned(session.user.id);
    await updateEvent(tenantId, eventId, updates);

    return { success: true };
  } catch (error: any) {
    console.error("[updateCalendarEventAction Error]", error);
    return { success: false, error: error.message || "Failed to update event" };
  }
}

export async function deleteCalendarEventAction(eventId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const tenantId = await ensureUserTenantProvisioned(session.user.id);
    await deleteEvent(tenantId, eventId);

    return { success: true };
  } catch (error: any) {
    console.error("[deleteCalendarEventAction Error]", error);
    return { success: false, error: error.message || "Failed to delete event" };
  }
}
