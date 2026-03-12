import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: `Task ${params.id} - Task Notes`,
    description: `View and edit task ${params.id}`,
    openGraph: {
      title: `Task ${params.id}`,
      description: "Task management application",
    },
  };
}

interface TaskDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function TaskDetailPage({ params }: TaskDetailPageProps) {
  const { id } = await params;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Task Details</h1>
      <p>Viewing task with ID: {id}</p>
    </div>
  );
}
