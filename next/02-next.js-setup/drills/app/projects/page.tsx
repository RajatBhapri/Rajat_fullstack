export default function ProjectsPage() {
  const projects = [
    { id: 1, name: "Website Redesign" },
    { id: 2, name: "Mobile App Development" },
    { id: 3, name: "Database Migration" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Projects</h1>

      <ul className="space-y-2">
        {projects.map((project) => (
          <li key={project.id} className="p-3 border rounded bg-white shadow">
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
