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
  return (
    <div>
      <h2>Book List</h2>
      {books.map((book) => (
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
