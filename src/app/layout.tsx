import "./globals.css";
import { Inter, Urbanist, Exo_2 } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-heading",
});

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-styled",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${urbanist.variable} ${exo2.variable}`}
    >
      <body >
        <ThemeProvider>
          <AuthProvider>
            <div className="bg-background text-text  ">
              <Header />
              <Navbar />
              <main className="lg:ml-64 flex flex-col min-h-screen justify-between">
                {children}
                <Footer />
              </main>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
