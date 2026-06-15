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

  // Ensure tenant is provisioned (handles old/existing users dynamically)
  await ensureUserTenantProvisioned(session.user.id);

  const body = await req.json();

  const result = await runAssistant(
    session.user.id,
    body.message
  );

  console.log("Message:", body.message);
  console.log("Result:", result);
  return Response.json(result);
}