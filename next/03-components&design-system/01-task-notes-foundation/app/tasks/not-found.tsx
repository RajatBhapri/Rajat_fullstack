import Link from "next/link";

export default function TasksNotFound() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">Task not found</h2>
      <p className="mt-3 text-slate-600">
        The task you are looking for does not exist or may have been removed.
      </p>

      <Link
        href="/tasks"
        className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Back to Tasks
      </Link>
    </div>
  );
}
