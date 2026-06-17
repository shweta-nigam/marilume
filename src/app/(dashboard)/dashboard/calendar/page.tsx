import CalendarPreview from "@/components/dashboard/CalendarPreview";
import AgentPanel from "@/components/dashboard/AgentPanel";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ensureUserTenantProvisioned } from "@/services/tenant.service";
import { getAllEvents } from "@/services/calendar.service";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Calendar, ShieldCheck, Sparkles, Wand2 } from "lucide-react";

export default async function CalendarPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/login");
  }

  let events: any[] = [];
  let isConnected = false;
  let tenantId = "";

  try {
    tenantId = await ensureUserTenantProvisioned(session.user.id);
    
    // Check if the user has an active googlecalendar connection in the database
    const connection = await prisma.corsairAccount.findFirst({
      where: {
        tenantId,
        integration: {
          name: "googlecalendar",
        },
      },
    });
    isConnected = !!connection;

    if (isConnected) {
      events = await getAllEvents(tenantId);
    }
  } catch (error) {
    console.error("[CalendarPage] Error loading page data:", error);
  }

  if (!isConnected) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-white">
        <div className="relative w-full max-w-2xl overflow-hidden rounded-[32px] border border-border bg-surface-elevated/60 p-10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          {/* Background Glow */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-secondary/10 blur-[100px]" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Calendar Icon Wrapper */}
            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-[24px] border border-primary/20 bg-primary/10 text-primary shadow-[0_0_40px_rgba(240,28,112,0.15)]">
              <Calendar size={36} />
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles size={12} /> Google Calendar
            </span>

            <h1 className="mt-6 font-heading text-3xl font-bold tracking-tight text-text md:text-4xl">
              Connect Your Calendar
            </h1>

            <p className="mt-4 max-w-md text-text-secondary leading-relaxed">
              Sync your Google Calendar to view, organize, and manage your meetings with Marilume's AI-powered assistant.
            </p>

            {/* Features list */}
            <div className="my-8 w-full border-y border-border py-6 text-left">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex gap-3">
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Wand2 size={12} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-text">AI Scheduling</h3>
                    <p className="text-xs text-text-secondary mt-0.5">Let Mari create, reschedule, or cancel events via chat.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <ShieldCheck size={12} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-text">Secure Connection</h3>
                    <p className="text-xs text-text-secondary mt-0.5">Direct authentication via Google OAuth 2.0.</p>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="/api/google/connect/calendar"
              className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-semibold text-white shadow-[0_0_30px_rgba(240,28,112,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(240,28,112,0.5)]"
            >
              Connect Google Calendar
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 h-full">
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