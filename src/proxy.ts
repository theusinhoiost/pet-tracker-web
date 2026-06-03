import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");
  const isGetRequest = request.method === "GET";

  const shouldBeAuthenticated = isDashboardPage;
  const shouldRedirect = shouldBeAuthenticated && isGetRequest;

  if (!shouldRedirect) {
    return NextResponse.next();
  }

  const jwtSession = request.cookies.get("loginSession")?.value;
  const isAuthenticated = !!jwtSession;

  if (!isAuthenticated) {
    const loginUrl = new URL("/login");
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
