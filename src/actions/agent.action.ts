"use server";

import { runAgent } from "@/services/agent.service";

export async function askAgent(
  userId: string,
  message: string
) {
  return runAgent(userId, message);
}