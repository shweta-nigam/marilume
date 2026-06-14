import { z } from "zod";
import { JsonSchema } from "./json.schema";

export const CreateAiTaskSchema = z.object({
  type: z.string().min(1),
  input: JsonSchema,
});

export const UpdateAiTaskSchema = z.object({
  taskId: z.string().min(1),
});

export const AgentPromptSchema = z.object({
  prompt: z.string().min(1),
});

export type CreateAiTaskInput = z.infer<typeof CreateAiTaskSchema>;
export type UpdateAiTaskInput = z.infer<typeof UpdateAiTaskSchema>;
export type AgentPromptInput = z.infer<typeof AgentPromptSchema>;