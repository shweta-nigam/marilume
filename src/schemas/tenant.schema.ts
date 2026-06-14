import { z } from "zod";

export const CreateTenantSchema = z.object({
  name: z.string().min(2).max(100),
});

export const UpdateTenantSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2).max(100),
});

export type CreateTenantInput =
  z.infer<typeof CreateTenantSchema>;

export type UpdateTenantInput =
  z.infer<typeof UpdateTenantSchema>;