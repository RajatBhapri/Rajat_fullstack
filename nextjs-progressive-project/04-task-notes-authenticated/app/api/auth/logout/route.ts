import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set(env.AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  response.cookies.set(env.USER_COOKIE_NAME, "", {
    httpOnly: false,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}