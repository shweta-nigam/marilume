import { auth } from "@/lib/auth";
import { corsair } from "@/server/corsair";
import { generateOAuthUrl } from "corsair/oauth";
import { ensureUserTenantProvisioned } from "@/services/tenant.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session || !session.user) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Ensure tenant is provisioned and retrieve tenant.id
  const tenantId = await ensureUserTenantProvisioned(session.user.id);

  const redirectUri = process.env.GOOGLE_GMAIL_REDIRECT_URI!;

  console.log(`[Gmail Connect] Generating OAuth URL for tenant: ${tenantId}, redirectUri: ${redirectUri}`);

  // Generate OAuth authorization URL natively via Corsair
  const { url } = await generateOAuthUrl(corsair, "gmail", {
    tenantId,
    redirectUri,
  });

  return NextResponse.redirect(url);
}


// import { prisma } from "@/lib/prisma";
// import { setupCorsair } from "corsair/setup";
// import { corsair } from "@/server/corsair";

// export async function getTenantId(userId: string) {
//   const user = await prisma.user.findUnique({
//     where: {
//       id: userId,
//     },
//     select: {
//       tenantId: true,
//     },
//   });

//   if (!user?.tenantId) {
//     throw new Error("Tenant not found");
//   }

//   return user.tenantId;
// }

// export async function ensureUserTenantProvisioned(
//   userId: string
// ): Promise<string> {
//   const user = await prisma.user.findUnique({
//     where: {
//       id: userId,
//     },
//     select: {
//       id: true,
//       name: true,
//       email: true,
//       tenantId: true,
//     },
//   });

//   if (!user) {
//     throw new Error(
//       `ensureUserTenantProvisioned: User not found: ${userId}`
//     );
//   }

//   let tenantId = user.tenantId;

//   // Create tenant if missing
//   if (!tenantId) {
//     const tenant = await prisma.tenant.create({
//       data: {
//         name: `${user.name || user.email || userId}'s Tenant`,
//       },
//     });

//     tenantId = tenant.id;

//     await prisma.user.update({
//       where: {
//         id: userId,
//       },
//       data: {
//         tenantId,
//       },
//     });

//     console.log(
//       `[Provisioning] Created tenant ${tenantId} for user ${userId}`
//     );
//   } else {
//     // Optional integrity check
//     const tenantExists = await prisma.tenant.findUnique({
//       where: {
//         id: tenantId,
//       },
//     });

//     if (!tenantExists) {
//       await prisma.tenant.create({
//         data: {
//           id: tenantId,
//           name: `${user.name || user.email || userId}'s Tenant`,
//         },
//       });

//       console.log(
//         `[Provisioning] Recreated missing tenant ${tenantId}`
//       );
//     }
//   }

//   // Provision tenant inside Corsair
//   try {
//     console.log(
//       `[Corsair Setup] Provisioning tenant ${tenantId}`
//     );

//     await setupCorsair(corsair, {
//       tenantId,
//     });
//   } catch (error) {
//     console.error(
//       `[Corsair Setup] Failed for tenant ${tenantId}:`,
//       error
//     );

//     throw error;
//   }

//   return tenantId;
// }