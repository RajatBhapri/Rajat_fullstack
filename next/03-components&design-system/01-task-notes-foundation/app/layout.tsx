import "./globals.css";
import Navigation from "./components/navigation";
import Footer from "./components/footer";

export const metadata = {
  title: "Task Notes",
  description: "Task management application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
        <div className="flex min-h-screen flex-col">
          <Navigation />

          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}