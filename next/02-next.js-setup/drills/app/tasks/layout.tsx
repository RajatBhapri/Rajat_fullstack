export default function TasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Tasks Section</h2>

      <div className="border p-4 bg-white rounded">{children}</div>
    </section>
  );
}
