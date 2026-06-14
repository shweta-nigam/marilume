import { z } from "zod";

export const SendEmailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1).max(500),
  body: z.string().min(1),
});

export const GenerateEmailSummarySchema = z.object({
  emailId: z.string().min(1),
});

export type SendEmailInput =
  z.infer<typeof SendEmailSchema>;

export type GenerateEmailSummaryInput =
  z.infer<typeof GenerateEmailSummarySchema>;