import { z } from "zod";
import { JsonSchema } from "./json.schema";

export const WebhookPayloadSchema = z.object({
  eventType: z.string().min(1),
  payload: JsonSchema,
});

export type WebhookPayloadInput =
  z.infer<typeof WebhookPayloadSchema>;