"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useNotes, Note } from "@/context/NotesContext";
import { useRouter } from "next/navigation";

export default function NoteDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getNote } = useNotes();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = getNote(id);
    if (found) setNote(found);
    setLoading(false);
  }, [id, getNote]);

  if (loading)
    return <div className="mt-10 text-center text-gray-500">Loading...</div>;

  if (!note) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Note Not Found</h2>
        <Link
          href="/"
          className="px-4 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700"
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/"
          className="flex items-center text-gray-400 hover:text-white transition-colors group"
        >
          <svg
            className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Back to Dashboard
        </Link>

        <span className="text-sm text-gray-600 font-mono bg-gray-900 px-3 py-1 rounded-full border border-gray-800">
          Created: {note.createdAt}
        </span>
      </div>

      {/* Content Card */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 sm:p-10 shadow-2xl">
        <h1 className="text-4xl font-extrabold text-white mb-8 tracking-tight">
          {note.title}
        </h1>
        <div className="prose prose-invert prose-lg max-w-none whitespace-pre-wrap text-gray-300 leading-relaxed">
          {note.content}
        </div>
      </div>
    </div>
  );
}
