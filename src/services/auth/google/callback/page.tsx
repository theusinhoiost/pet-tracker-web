import { redirect } from "next/navigation";
import { exchangeGoogleCode } from "@/services/auth/google";
import { cookies } from "next/headers";

type GoogleCallbackPageProps = {
  searchParams: Promise<{
    code?: string;
  }>;
};

export default async function GoogleCallbackPage({
  searchParams,
}: GoogleCallbackPageProps) {
  const { code } = await searchParams;

  if (!code) {
    redirect("/login?error=google_auth_failed");
  }

  try {
    const data = await exchangeGoogleCode(code);

    const cookieStore = await cookies();

    cookieStore.set("__Host-accessToken", data.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60,
      path: "/",
    });

    cookieStore.set("__Host-refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    cookieStore.set("user", JSON.stringify(data.user), {
      httpOnly: false,
      secure: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    redirect("/dashboard");
  } catch (error) {
    console.error("Google authentication error:", error);

    redirect("/login?error=google_auth_failed");
  }
}
