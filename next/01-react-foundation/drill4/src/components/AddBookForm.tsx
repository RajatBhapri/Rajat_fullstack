import { useState } from "react";

interface Book {
  title: string;
  author: string;
}

export default function AddBookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState<Book[]>([]);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newBook: Book = { title, author };

    setBooks((prev) => [...prev, newBook]);

    console.log("Adding book:", newBook);

    setTitle("");
    setAuthor("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("Enter pressed:", e.currentTarget.value);
    }
  };

  const handleClick = () => {
    console.log("Clicked Add Book Button");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Book title"
        />

        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Author name"
        />

        <button type="submit" onClick={handleClick}>
          Add Book
        </button>
      </form>

      <h3>Books List</h3>

      <ul>
        {books.map((book, index) => (
          <li key={index}>
            {book.title} -by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}
