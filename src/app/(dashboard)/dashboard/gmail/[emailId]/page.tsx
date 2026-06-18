import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ensureUserTenantProvisioned } from "@/services/tenant.service";
import { getEmailById } from "@/services/email.service";
import { redirect, notFound } from "next/navigation";
import GmailDetailClient from "@/components/dashboard/GmailDetailClient";

export default async function GmailDetailPage({
  params,
}: {
  params: Promise<{ emailId: string }>;
}) {
  const { emailId } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/login");
  }

  let email = null;
  try {
    const tenantId = await ensureUserTenantProvisioned(session.user.id);
    email = await getEmailById(tenantId, emailId);
  } catch (error) {
    console.error("[GmailDetailPage] Error fetching email details:", error);
  }

  if (!email) {
    notFound();
  }

  return <GmailDetailClient initialEmail={email} />;
}
