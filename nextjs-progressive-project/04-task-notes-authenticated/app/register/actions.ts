"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { api } from "@/lib/api";
import { env } from "@/lib/env";

export type RegisterActionState = {
  error?: string;
};

export async function register(
  _prevState: RegisterActionState,
  formData: FormData,
): Promise<RegisterActionState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");

  if (!email || !password || !confirmPassword) {
    return { error: "All fields are required." };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  try {
    const response = await api.auth.register({ email, password });

    if (response.token) {
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

      redirect("/tasks");
    }
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to create account. Email may already exist.",
    };
  }

  redirect("/login");
}