import { useState } from "react";
import BookCard from "./BookCard";

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  isAvailable: boolean;
}

interface BookListProps {
  books: Book[];
}

export default function BookList({ books }: BookListProps) {
  const [search, setSearch] = useState("");

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredBooks.map((book) => (
        <BookCard
          key={book.id}
          title={book.title}
          author={book.author}
          year={book.year}
          isAvailable={book.isAvailable}
        />
      ))}
    </div>
  );
}
