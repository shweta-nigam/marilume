import { auth } from "@/lib/auth";
// import { auth } from "../../../../lib/auth"
export async function GET() {
  return Response.json({
    apiKeys: Object.keys(auth.api),
  });
}

//  export const { GET,POST} = toNextJsHandler(auth)