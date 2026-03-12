import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/tasks">Tasks</Link>
        <Link href="/projects">Projects</Link>
      </div>
    </nav>
  );
}
