"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  clearClientSession,
  getClientAuthEmail,
  getClientAuthToken,
  subscribeToAuthChange,
} from "@/lib/auth";

export function AuthNav() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const syncAuthState = () => {
      setToken(getClientAuthToken());
      setEmail(getClientAuthEmail());
    };

    syncAuthState();

    return subscribeToAuthChange(syncAuthState);
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await clearClientSession();
      router.push("/login");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  };

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
    <div className="flex items-center gap-2">
      {email ? (
        <span className="hidden rounded-md border px-3 py-2 text-sm text-[hsl(var(--muted-foreground))] md:inline-flex">
          {email}
        </span>
      ) : null}

      <Button
        type="button"
        variant="outline"
        onClick={handleLogout}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? "Logging out..." : "Logout"}
      </Button>
    </div>
  );
}