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

export const metadata = {
  title: {
    default: "Synthai - AI-Powered Transcription & Analysis",
    template: "%s | Synthai",
  },
  description: "Transform your audio into intelligent insights with Synthai. AI-powered transcription and analysis for songs, lectures, audiobooks, and conversations.",
  keywords: ["AI transcription", "audio analysis", "speech to text", "audio intelligence", "transcription service", "AI insights"],
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Synthai",
    title: "Synthai - AI-Powered Transcription & Analysis",
    description: "Transform your audio into intelligent insights with Synthai",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Synthai Logo",
      },
    ],
  },
 
 
};

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
