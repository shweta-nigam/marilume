import { prisma } from "@/lib/prisma";
import { setupCorsair } from "corsair";
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

export async function ensureUserTenantProvisioned(userId: string) {
  // 1. Get user details
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    console.error(`ensureUserTenantProvisioned: User not found: ${userId}`);
    return;
  }

  // 2. Create Tenant if not exists
  await prisma.tenant.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      name: `${user.name || user.email || userId}'s Tenant`,
    },
  });

  // 3. Link user.tenantId to userId if not set
  if (user.tenantId !== userId) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        tenantId: userId,
      },
    });
  }

  // 4. Retrieve Google OAuth account credentials if they exist
  const googleAccount = await prisma.account.findFirst({
    where: {
      userId: userId,
      providerId: "google",
    },
  });

  const credentials: Record<string, Record<string, string>> = {};

  if (googleAccount) {
    const gmailCreds: Record<string, string> = {};
    const calCreds: Record<string, string> = {};

    if (googleAccount.accessToken) {
      gmailCreds.access_token = googleAccount.accessToken;
      calCreds.access_token = googleAccount.accessToken;
    }
    if (googleAccount.refreshToken) {
      gmailCreds.refresh_token = googleAccount.refreshToken;
      calCreds.refresh_token = googleAccount.refreshToken;
    }
    if (googleAccount.accessTokenExpiresAt) {
      const expiresSec = String(Math.floor(googleAccount.accessTokenExpiresAt.getTime() / 1000));
      gmailCreds.expires_at = expiresSec;
      calCreds.expires_at = expiresSec;
    }

    if (Object.keys(gmailCreds).length > 0) {
      credentials.gmail = gmailCreds;
    }
    if (Object.keys(calCreds).length > 0) {
      credentials.googlecalendar = calCreds;
    }
  }

  // 5. Setup Corsair tenant (idempotent setup)
  console.log(`Setting up Corsair for tenant: ${userId} with credentials:`, Object.keys(credentials));
  await setupCorsair(corsair, {
    tenantId: userId,
    credentials: Object.keys(credentials).length > 0 ? credentials : undefined,
  });
}