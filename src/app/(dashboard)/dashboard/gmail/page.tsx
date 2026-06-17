import GmailDashboard from "@/components/dashboard/GmailDashboard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ensureUserTenantProvisioned } from "@/services/tenant.service";
import { getRecentEmails, type EmailSearchResult } from "@/services/email.service";
import { redirect } from "next/navigation";

export default async function GmailPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/login");
  }

  let emails: EmailSearchResult[] = [];
  try {
    const tenantId = await ensureUserTenantProvisioned(session.user.id);
    emails = await getRecentEmails(tenantId, 5);
  } catch (error) {
    console.error("[GmailPage] Error loading emails:", error);
  }

  return (
    <div className="p-8 h-full">
      <GmailDashboard initialEmails={emails} />
    </div>
  );
}