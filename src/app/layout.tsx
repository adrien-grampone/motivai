import type { Metadata } from "next";
import { Lora, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";

const serif = Lora({ 
  subsets: ["latin"], 
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"]
});

const sans = Plus_Jakarta_Sans({ 
  subsets: ["latin"], 
  variable: "--font-sans" 
});

export const metadata: Metadata = {
  title: "MotivAI | L'art de la candidature, sublimé par l'IA",
  description: "Générez une lettre de motivation d'exception. Un design intemporel, une analyse humaine, une technologie invisible.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased selection:bg-primary/10",
        sans.variable,
        serif.variable
      )}>
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}

