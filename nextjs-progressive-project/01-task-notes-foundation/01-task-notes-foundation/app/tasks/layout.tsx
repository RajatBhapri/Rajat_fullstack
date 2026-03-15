// app/tasks/layout.tsx
export default function TasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}