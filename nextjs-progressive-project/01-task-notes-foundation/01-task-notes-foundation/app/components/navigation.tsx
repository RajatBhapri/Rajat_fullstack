import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tasks", label: "Tasks" },
  { href: "/about", label: "About" },
];

export default function Navigation() {
  return (
    <header className="sticky top-0 z-50 border-b bg-[hsl(var(--card))]/90 backdrop-blur transition-colors duration-300">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-[hsl(var(--foreground))]"
        >
          Task Notes
        </Link>

        <div className="flex items-center gap-3">
          <nav>
            <ul className="flex items-center gap-2 sm:gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-md px-3 py-2 text-sm font-medium text-[hsl(var(--foreground))] transition hover:bg-[hsl(var(--accent))]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
