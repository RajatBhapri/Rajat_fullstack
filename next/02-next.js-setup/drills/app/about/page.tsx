// app/about/page.tsx
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">About</h1>
      <p className="mb-4">
        This app helps you manage tasks and notes efficiently.
      </p>
      <Link href="/" className="text-blue-600 hover:underline">
        Back to Home
      </Link>
    </div>
  );
}
