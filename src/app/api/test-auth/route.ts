import { auth } from "@/lib/auth";

export async function GET() {
  return Response.json({
    success: true,
    authLoaded: !!auth,
  });
}



