"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function KeyboardShortcuts() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();

      if (tag === "input" || tag === "textarea") return;

      if (event.key === "n") {
        event.preventDefault();
        router.push("/tasks/new");
        toast("Shortcut: New Task");
      }

      if (event.key === "g") {
        event.preventDefault();
        router.push("/tasks");
        toast("Shortcut: Go to Tasks");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return null;
}