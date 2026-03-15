import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { token?: string };

  if (!body.token) {
    return NextResponse.json(
      { message: "Token is required." },
      { status: 400 },
    );
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set(env.AUTH_COOKIE_NAME, body.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });

  response.cookies.set(env.AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}