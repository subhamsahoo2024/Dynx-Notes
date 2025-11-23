"use client";

import { useState } from "react";
import Link from "next/link";
import { useNotes } from "@/context/NotesContext";

export default function Home() {
  const { notes, addNote, deleteNote } = useNotes();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    addNote(title, content);
    setTitle("");
    setContent("");
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* LEFT SIDEBAR: Input Form */}
      <div className="lg:col-span-4 xl:col-span-3">
        <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl sticky top-24">
          <h2 className="text-lg font-semibold text-white mb-4">Create Note</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <textarea
              placeholder="Type your note..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              Save Note
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT CONTENT: Search & List */}
      <div className="lg:col-span-8 xl:col-span-9 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search your notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 text-white pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <svg
            className="w-5 h-5 text-gray-500 absolute left-3 top-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>

        {/* Notes Grid */}
        {filteredNotes.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-gray-800 rounded-xl">
            <p className="text-gray-500 text-lg">
              {search ? "No matches found." : "Your collection is empty."}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredNotes.map((note) => (
              <div key={note.id} className="relative group">
                <Link href={`/notes/${note.id}`} className="block">
                  <div className="bg-gray-900/60 border border-gray-800 p-5 rounded-xl h-full hover:border-indigo-500/50 hover:bg-gray-900 transition-all duration-200 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-100 line-clamp-1 group-hover:text-indigo-400 transition-colors">
                        {note.title}
                      </h3>
                    </div>
                    <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">
                      {note.content}
                    </p>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-800/50 mt-auto">
                      <span className="text-xs text-gray-600">
                        {note.createdAt}
                      </span>
                      <span className="text-xs font-medium text-indigo-400 group-hover:translate-x-1 transition-transform">
                        Open &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    deleteNote(note.id);
                  }}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-500 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  title="Delete note"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
