"use server";

import { runAgent } from "@/services/assistant.service";

export async function askAgent(
  userId: string,
  message: string
) {
  return runAgent(userId, message);
}