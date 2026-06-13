import { NextRequest, NextResponse } from "next/server";
const publicRoutes = ["/login", "/register"];

export async function proxy(req: NextRequest) {
  if (process.env.DISABLE_AUTH_MIDDLEWARE === "true") {
    return NextResponse.next();
  }
  const token = req.cookies.get("accessToken");

  const isPublicRoute = publicRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route),
  );

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/pets/:path*", "/settings/:path*"],
};
