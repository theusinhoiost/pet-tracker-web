import { NextResponse } from "next/server";
import { exchangeGoogleCode } from "@/services/auth/google";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=google_auth_failed", request.url),
    );
  }

  try {
    const data = await exchangeGoogleCode(code);

    const response = NextResponse.redirect(new URL("/dashboard", request.url));

    const secure = process.env.NODE_ENV === "production";

    response.cookies.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      maxAge: 60 * 60,
      path: "/",
    });

    response.cookies.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    response.cookies.set("user", JSON.stringify(data.user), {
      httpOnly: false,
      secure,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Google authentication error:", error);

    return NextResponse.redirect(
      new URL("/login?error=google_auth_failed", request.url),
    );
  }
}
