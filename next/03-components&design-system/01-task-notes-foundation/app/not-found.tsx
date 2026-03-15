import Link from "next/link";

export default function GlobalNotFoundPage() {
  return (
    <section className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      <h1 className="text-4xl font-bold text-slate-900">404</h1>
      <h2 className="mt-3 text-2xl font-semibold text-slate-800">
        Page not found
      </h2>
      <p className="mt-4 text-slate-600">
        The page you are trying to visit does not exist.
      </p>

      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Go Home
      </Link>
    </section>
  );
}
