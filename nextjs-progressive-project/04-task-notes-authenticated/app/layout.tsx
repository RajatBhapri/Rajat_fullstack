import "./globals.css";
import Navigation from "./components/navigation";
import Footer from "./components/footer";
import { AuthProvider } from "./contexts/AuthContext";

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
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <Navigation />
            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}