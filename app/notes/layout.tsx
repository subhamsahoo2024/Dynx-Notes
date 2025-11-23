import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Notes | Notes App",
  description: "View and manage all your notes",
};

export default function NotesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
