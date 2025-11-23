"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

type NotesContextType = {
  notes: Note[];
  addNote: (title: string, content: string) => void;
  getNote: (id: string) => Note | undefined;
  deleteNote: (id: string) => void;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);

  // Load from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("my-notes-app");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  // Save to LocalStorage on change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("my-notes-app", JSON.stringify(notes));
    }
  }, [notes]);

  const addNote = (title: string, content: string) => {
    const newNote: Note = {
      id: Date.now().toString(), // Simple ID generation
      title,
      content,
      createdAt: new Date().toLocaleDateString(),
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const getNote = (id: string) => notes.find((n) => n.id === id);

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, getNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
}

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) throw new Error("useNotes must be used within a NotesProvider");
  return context;
};
