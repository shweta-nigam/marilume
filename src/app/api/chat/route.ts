import { runAssistant } from "@/services/assistant.service";
import { auth } from "@/lib/auth";
import { ensureUserTenantProvisioned } from "@/services/tenant.service";

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session || !session.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Ensure tenant is provisioned and resolve the actual tenantId
  const tenantId = await ensureUserTenantProvisioned(session.user.id);

  const body = await req.json();

  console.log(`[Chat Route] Resolving chat for tenantId: ${tenantId}`);

  const result = await runAssistant(
    tenantId,
    body.message
  );

  console.log("Message:", body.message);
  console.log("Result:", result);
  return Response.json(result);
}