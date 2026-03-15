import { cookies } from "next/headers";
import { env } from "@/lib/env";

export async function getServerAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(env.AUTH_COOKIE_NAME)?.value ?? null;
}
