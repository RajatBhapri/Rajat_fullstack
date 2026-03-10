interface BookCardProps {
  title: string;
  author: string;
  year: number;
  isAvailable?: boolean;
}

export default function BookCard({
  title,
  author,
  year,
  isAvailable = true,
}: BookCardProps) {
  return (
    <div className="book-card">
      <h3>{title}</h3>
      <p>
        by {author} ({year})
      </p>

      {isAvailable && <span className="badge">Available</span>}
    </div>
  );
}
