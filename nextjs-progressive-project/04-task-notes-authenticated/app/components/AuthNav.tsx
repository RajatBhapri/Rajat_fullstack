import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { env } from "@/lib/env";
import { logoutAction } from "./auth-actions";

export async function AuthNav() {
  const cookieStore = await cookies();
  const token = cookieStore.get(env.AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className="rounded-md px-3 py-2 text-sm font-medium text-[hsl(var(--foreground))] transition hover:bg-[hsl(var(--accent))]"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="rounded-md bg-[hsl(var(--primary))] px-3 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))] transition hover:opacity-90"
        >
          Register
        </Link>
      </div>
    );
  }

  return (
    <form action={logoutAction}>
      <Button type="submit" variant="outline" size="sm">
        Logout
      </Button>
    </form>
  );
}