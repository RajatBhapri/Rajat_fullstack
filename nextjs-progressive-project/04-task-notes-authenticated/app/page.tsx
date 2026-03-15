import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to Task Notes, a Next.js task management app with custom light and dark theme support.",
};

export default function HomePage() {
  return (
    <section className="grid gap-8 md:grid-cols-2 md:items-center">
      <div className="space-y-5">
        <span className="inline-flex rounded-full bg-[hsl(var(--accent))] px-3 py-1 text-sm font-medium text-[hsl(var(--accent-foreground))] transition-colors duration-300">
          Next.js Task Notes Foundation
        </span>

        <h1 className="text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] sm:text-5xl">
          Organize your tasks with clarity and speed
        </h1>

        <p className="max-w-xl text-base leading-7 text-[hsl(var(--muted-foreground))] sm:text-lg">
          Welcome to Task Notes. This frontend foundation is built with Next.js,
          TypeScript, Tailwind CSS, and a custom light/dark theme system.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/tasks"
            className="rounded-lg bg-[hsl(var(--primary))] px-5 py-3 text-sm font-semibold text-[hsl(var(--primary-foreground))] transition-all duration-300 hover:scale-[1.02] hover:opacity-90"
          >
            View Tasks
          </Link>

          <Link
            href="/about"
            className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-5 py-3 text-sm font-semibold text-[hsl(var(--foreground))] transition-all duration-300 hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]"
          >
            Learn More
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm transition-colors duration-300">
        <h2 className="text-xl font-semibold text-[hsl(var(--card-foreground))]">
          What this foundation includes
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-[hsl(var(--secondary))] p-4 transition-colors duration-300">
            <h3 className="font-semibold text-[hsl(var(--foreground))]">
              App Router
            </h3>
            <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
              Modern routing and layouts using the Next.js app directory.
            </p>
          </div>

          <div className="rounded-xl bg-[hsl(var(--secondary))] p-4 transition-colors duration-300">
            <h3 className="font-semibold text-[hsl(var(--foreground))]">
              TypeScript
            </h3>
            <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
              Strong typing for safer and more maintainable code.
            </p>
          </div>

          <div className="rounded-xl bg-[hsl(var(--secondary))] p-4 transition-colors duration-300">
            <h3 className="font-semibold text-[hsl(var(--foreground))]">
              Tailwind CSS
            </h3>
            <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
              Clean, responsive styling with reusable utility classes.
            </p>
          </div>

          <div className="rounded-xl bg-[hsl(var(--secondary))] p-4 transition-colors duration-300">
            <h3 className="font-semibold text-[hsl(var(--foreground))]">
              Theme Support
            </h3>
            <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
              Custom light and dark mode with saved theme preference.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
