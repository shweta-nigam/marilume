import { prisma } from "@/lib/prisma";
import { setupCorsair } from "corsair/setup";
import { corsair } from "@/server/corsair";

export async function getTenantId(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      tenantId: true,
    },
  });

  if (!user?.tenantId) {
    throw new Error("Tenant not found");
  }

  return user.tenantId;
}

export async function ensureUserTenantProvisioned(userId: string): Promise<string> {
  // 1. Get user details
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, tenantId: true },
  });

  if (!user) {
    throw new Error(`ensureUserTenantProvisioned: User not found: ${userId}`);
  }

  let tenantId = user.tenantId;

  if (!tenantId) {
    // 2. Create Tenant record with its own distinct cuid
    const tenant = await prisma.tenant.create({
      data: {
        name: `${user.name || user.email || userId}'s Tenant`,
      },
    });

    tenantId = tenant.id;

    // 3. Link user.tenantId to the new tenant.id
    await prisma.user.update({
      where: { id: userId },
      data: {
        tenantId: tenantId,
      },
    });

    console.log(`[Provisioning] Created new Tenant ${tenantId} for user ${userId}`);
  } else {
    // Integrity check: make sure the tenant record actually exists in the database
    const tenantExists = await prisma.tenant.findUnique({
      where: { id: tenantId },
    });

    if (!tenantExists) {
      await prisma.tenant.create({
        data: {
          id: tenantId,
          name: `${user.name || user.email || userId}'s Tenant`,
        },
      });
    }
  }

  // 4. Provision tenant in Corsair (account-level setup)
  console.log(`[Corsair Setup] Provisioning tenant: ${tenantId} in Corsair`);
  await setupCorsair(corsair, {
    tenantId: tenantId,
  });

  return tenantId;
}