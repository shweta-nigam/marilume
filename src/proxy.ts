import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const cookies = request.cookies.getAll();
  console.log("[Proxy Cookies]:", cookies.map(c => `${c.name}=${c.value}`));

  // Retrieve the session token from cookies
  const sessionToken =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__secure-better-auth.session_token")?.value;

  console.log("[Proxy Session Token]:", sessionToken);

  // If there is no session token, redirect to /login
  if (!sessionToken) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Apply the proxy to /dashboard and all of its sub-routes
export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
