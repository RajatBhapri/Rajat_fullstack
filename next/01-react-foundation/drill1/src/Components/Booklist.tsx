import BookCard from "./Bookcard";

type Book = {
  id: number;
  title: string;
  author: string;
};

export default function BookList() {
  const books: Book[] = [
    { id: 1, title: "rb", author: "rajb" },
    { id: 2, title: "raj", author: "b" },
    { id: 3, title: "rajat", author: "raj" },
  ];

  return (
    <div className="book-list">
      <h1>Book List</h1>

      {books.map((book) => (
        <BookCard key={book.id} title={book.title} author={book.author} />
      ))}
    </div>
  );
}
