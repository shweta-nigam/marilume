import CalendarPreview from "@/components/dashboard/CalendarPreview";
import AgentPanel from "@/components/dashboard/AgentPanel";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ensureUserTenantProvisioned } from "@/services/tenant.service";
import { getAllEvents } from "@/services/calendar.service";
import { redirect } from "next/navigation";

export default async function CalendarPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/login");
  }

  let events: any[] = [];
  try {
    const tenantId = await ensureUserTenantProvisioned(session.user.id);
    events = await getAllEvents(tenantId);
  } catch (error) {
    console.error("[CalendarPage] Error loading events:", error);
  }

  return (
    <div className="p-8 h-screen">
      <div className="grid grid-cols-5 gap-6 h-full text-white">
        <div className="col-span-3 h-full">
          <CalendarPreview events={events} />
        </div>

        <div className="col-span-2 h-full">
          <AgentPanel />
        </div>
      </div>
    </div>
  );
}