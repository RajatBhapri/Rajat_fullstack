interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <header style={{ padding: "10px" }}>
        <h1>My App Header</h1>
      </header>

      <main>{children}</main>

      <footer style={{ padding: "10px", marginTop: "20px" }}>
        <p>My App Footer</p>
      </footer>
    </div>
  );
}
