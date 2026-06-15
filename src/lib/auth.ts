import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { ensureUserTenantProvisioned } from "@/services/tenant.service";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  user: {
    additionalFields: {
      tenantId: {
        type: "string",
        required: false,
        defaultValue: null,
      },
    },
  },

  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          console.log(`[BetterAuth Hook] User created: ${user.id}, email: ${user.email}`);
          try {
            await ensureUserTenantProvisioned(user.id);
            console.log(`[BetterAuth Hook] User tenant provisioned successfully for ${user.id}`);
          } catch (error) {
            console.error(`[BetterAuth Hook] Error provisioning tenant for user ${user.id}:`, error);
          }
        },
      },
    },
    session: {
      create: {
        after: async (session) => {
          console.log(`[BetterAuth Hook] Session created for user: ${session.userId}`);
          try {
            await ensureUserTenantProvisioned(session.userId);
            console.log(`[BetterAuth Hook] User tenant verified/provisioned successfully for ${session.userId}`);
          } catch (error) {
            console.error(`[BetterAuth Hook] Error provisioning tenant on session creation for user ${session.userId}:`, error);
          }
        },
      },
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,

      scopes: [
        "openid",
        "email",
        "profile",
        "https://www.googleapis.com/auth/gmail.readonly",
        "https://www.googleapis.com/auth/gmail.send",
        "https://www.googleapis.com/auth/gmail.compose",
        "https://www.googleapis.com/auth/calendar.readonly",
      ],
    },
  },
});


// console.log("AUTH KEYS:", Object.keys(auth));

// export const auth = betterAuth({
//   database: prisma,
// });

