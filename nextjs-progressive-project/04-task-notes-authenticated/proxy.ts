import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { env } from "@/lib/env";

const JWT_SECRET = new TextEncoder().encode(env.JWT_SECRET);

const protectedRoutes = ["/tasks", "/profile", "/settings"];
const authRoutes = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get(env.AUTH_COOKIE_NAME)?.value;

  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route),
  );

  const isAuthRoute = authRoutes.includes(path);

  let isValidToken = false;

  if (token) {
    try {
      await jwtVerify(token, JWT_SECRET);
      isValidToken = true;
    } catch {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete(env.AUTH_COOKIE_NAME);
      response.cookies.delete(env.USER_COOKIE_NAME);
      return response;
    }
  }

  if (isProtectedRoute && !isValidToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoute && isValidToken) {
    return NextResponse.redirect(new URL("/tasks", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};