type BookCardProps = {
  title: string;
  author: string;
};

export default function BookCard({ title, author }: BookCardProps) {
  return (
    <div className="book-card">
      <h2 className="book-title">{title}</h2>
      <p className="book-author">Author: {author}</p>
    </div>
  );
}
