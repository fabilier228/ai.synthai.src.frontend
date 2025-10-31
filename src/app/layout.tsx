import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-text min-h-screen">
          <Header />
          <div className="flex flex-row">
            <Navbar />
            <main className="flex-1 min-h-screen md:ml-64">
              <ThemeProvider>{children}</ThemeProvider>
            </main>
          </div>
      </body>
    </html>
  );
}
