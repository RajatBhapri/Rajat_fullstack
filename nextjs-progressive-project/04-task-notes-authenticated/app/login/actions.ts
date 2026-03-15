"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { api } from "@/lib/api";
import { env } from "@/lib/env";

export type AuthActionState = {
  error?: string;
};

export async function login(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  try {
    const response = await api.auth.login({ email, password });

    if (!response.token) {
      return { error: "Login succeeded but no token was returned." };
    }

    const cookieStore = await cookies();

    cookieStore.set(env.AUTH_COOKIE_NAME, response.token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    cookieStore.set(
      env.USER_COOKIE_NAME,
      JSON.stringify(
        response.user ?? {
          email,
        },
      ),
      {
        httpOnly: false,
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      },
    );
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Invalid email or password.",
    };
  }

  redirect("/tasks");
}