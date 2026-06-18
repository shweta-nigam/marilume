import GmailDashboard from "@/components/dashboard/GmailDashboard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ensureUserTenantProvisioned } from "@/services/tenant.service";
import { getRecentEmails, type EmailSearchResult } from "@/services/email.service";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Mail, ShieldCheck, Sparkles, Wand2 } from "lucide-react";

export default async function GmailPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/login");
  }

  let emails: EmailSearchResult[] = [];
  let isConnected = false;
  let tenantId = "";

  try {
    tenantId = await ensureUserTenantProvisioned(session.user.id);
    
    // Check if the user has an active gmail connection in the database
    const connection = await prisma.corsairAccount.findFirst({
      where: {
        tenantId,
        integration: {
          name: "gmail",
        },
      },
    });
    isConnected = !!connection;

    if (isConnected) {
      emails = await getRecentEmails(tenantId, 5);
    }
  } catch (error) {
    console.error("[GmailPage] Error loading page data:", error);
  }

  if (!isConnected) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-white">
        <div className="relative w-full max-w-2xl overflow-hidden rounded-[32px] border border-border bg-surface-elevated/60 p-10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          {/* Background Glow */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-secondary/10 blur-[100px]" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Mail Icon Wrapper */}
            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-[24px] border border-primary/20 bg-primary/10 text-primary shadow-[0_0_40px_rgba(240,28,112,0.15)]">
              <Mail size={36} />
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles size={12} /> Gmail Integration
            </span>

            <h1 className="mt-6 font-heading text-3xl font-bold tracking-tight text-text md:text-4xl">
              Connect Your Inbox
            </h1>

            <p className="mt-4 max-w-md text-text-secondary leading-relaxed">
              Sync your Gmail account to prioritize, summarize, search, and draft responses to your emails automatically using Marilume's AI.
            </p>

            {/* Features list */}
            <div className="my-8 w-full border-y border-border py-6 text-left">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex gap-3">
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Wand2 size={12} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-text">Priority Summaries</h3>
                    <p className="text-xs text-text-secondary mt-0.5">Get instant summaries and action items from your inbox.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <ShieldCheck size={12} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-text">Secure Connection</h3>
                    <p className="text-xs text-text-secondary mt-0.5">Authenticated directly via Google Console credentials.</p>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="/api/gmail/connect"
              className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-semibold text-white shadow-[0_0_30px_rgba(240,28,112,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(240,28,112,0.5)]"
            >
              Connect Gmail
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 h-full">
      <GmailDashboard initialEmails={emails} />
    </div>
  );
}