// async function getTasks() {
//   await new Promise((resolve) => setTimeout(resolve, 3000));
//   return ["Task 1", "Task 2", "Task 3"];
// }

// export default async function TasksPage() {
//   const tasks = await getTasks();

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">Tasks</h1>

//       <ul>
//         {tasks.map((task, i) => (
//           <li key={i}>{task}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tasks - Task Notes",
  description: "View and manage all your tasks",
  openGraph: {
    title: "Tasks",
    description: "Task management application",
  },
};

export default function TasksPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Tasks</h1>
      <p>Here are your tasks.</p>
    </div>
  );
}
