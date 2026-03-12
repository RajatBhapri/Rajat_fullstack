import { useState } from "react";

interface BookCardProps {
  title: string;
  author: string;
  year: number;
  isAvailable: boolean;
}

export default function BookCard({
  title,
  author,
  year,
  isAvailable: initialAvailable,
}: BookCardProps) {
  const [isAvailable, setIsAvailable] = useState(initialAvailable);

  return (
    <div className="book-card">
      <h3>{title}</h3>
      <p>
        by {author} ({year})
      </p>
      {isAvailable && <span>Available</span>}
      <button onClick={() => setIsAvailable(!isAvailable)}>
        {isAvailable ? "Mark Unavailable" : "Mark Available"}
      </button>
    </div>
  );
}
