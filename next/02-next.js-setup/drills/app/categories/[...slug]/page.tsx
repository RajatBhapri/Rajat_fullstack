interface CategoryPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const segments = slug ?? [];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Category Page</h1>

      {segments.length === 0 ? (
        <p>No category selected.</p>
      ) : (
        <>
          <p className="mb-2">Slug segments:</p>

          <ul className="list-disc ml-6">
            {segments.map((segment, index) => (
              <li key={index}>{segment}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
