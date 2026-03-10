import BookList from "./components/BookList";
import Counter from "./components/Counter";

const books = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    year: 2018,
    isAvailable: true,
  },
  {
    id: 2,
    title: "Deep Work",
    author: "Cal Newport",
    year: 2016,
    isAvailable: false,
  },
  {
    id: 3,
    title: "Clean Code",
    author: "Robert Martin",
    year: 2008,
    isAvailable: true,
  },
];

export default function App() {
  return (
    <div>
      <Counter />
      <BookList books={books} />
    </div>
  );
}
