import BookList from "./components/BookList";
import UserProfile from "./components/UserProfile";

const user = {
  name: "Rajat",
  age: 24,
  email: "rajat@example.com",
};

const books = [
  {
    id: 1,
    title: "rajb",
    author: "rajbh",
    year: 2018,
    isAvailable: true,
  },
  {
    id: 2,
    title: "rb",
    author: "rb2",
    year: 2016,
    isAvailable: false,
  },
];

export default function App() {
  return (
    <div>
      <UserProfile user={user} />

      <BookList books={books} />
    </div>
  );
}
