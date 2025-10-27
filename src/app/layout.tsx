import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-text min-h-screen">
        <Header />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
