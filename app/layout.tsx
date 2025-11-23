import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { NotesProvider } from "@/context/NotesContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Notes App",
  description: "Simple Note Taking App with Next.js 16",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-950 text-gray-200 min-h-screen flex flex-col`}
      >
        <NotesProvider>
          <Navbar />
          <main className="flex-grow max-w-6xl w-full mx-auto px-6 py-8">
            {children}
          </main>
        </NotesProvider>
      </body>
    </html>
  );
}
