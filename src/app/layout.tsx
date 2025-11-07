import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter, Urbanist, Exo_2 } from 'next/font/google';
import Header from "@/components/Header";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans', 
});

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-heading', 
});

const exo2 = Exo_2({
  subsets: ['latin'],
  variable: '--font-styled', 
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${urbanist.variable} ${exo2.variable}`}>
      <body className="bg-background text-text min-h-screen">
          <Header />
          <div className="flex flex-row">
            <main className="flex-1 min-h-screen md:ml-64">
              <ThemeProvider>{children}</ThemeProvider>
            </main>
          </div>
      </body>
    </html>
  );
}
