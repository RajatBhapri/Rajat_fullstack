import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome</h1>
      <p className="mt-2">This is the home page.</p>
      <Link href="/tasks">Tasks</Link>
    </div>
  );
}
