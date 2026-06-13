import { auth } from "../../../../lib/auth"
import { toNextJsHandler } from "better-auth/next-js"

// export const { GET,POST} = toNextJsHandler(auth)

// export async function GET() {
//   return Response.json({
//     authType: typeof auth,
//     keys: Object.keys(auth),
//   });
// }

export async function GET(request: Request) {
  return auth.handler(request);
}

export async function POST(request: Request) {
  return auth.handler(request);
}

// export async function GET() {
//   return Response.json({
//     message: "route works",
//   });
// }

// export async function POST() {
//   return Response.json({
//     authExists: !!auth,
//   });
// }