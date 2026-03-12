import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Task Manager",
  description: "Next.js Drill Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 container mx-auto p-6">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
