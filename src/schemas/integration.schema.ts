import { z } from "zod";
import { JsonSchema } from "./json.schema";

export const ConnectIntegrationSchema = z.object({
  integrationId: z.string().min(1),
  tenantId: z.string().min(1),
  config: JsonSchema,
});

export const SyncIntegrationSchema = z.object({
  accountId: z.string().min(1),
});

export type ConnectIntegrationInput =
  z.infer<typeof ConnectIntegrationSchema>;

export type SyncIntegrationInput =
  z.infer<typeof SyncIntegrationSchema>;