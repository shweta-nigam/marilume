import { runAssistant }
from "@/services/assistant.service";

export async function POST(
  req: Request
) {
  const body =
    await req.json();

  const result =
    await runAssistant(
      "dev",
      body.message
    );

    console.log("Message:", body.message);
    console.log("Result:", result);
  return Response.json(result);
}