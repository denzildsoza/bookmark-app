"use client";

import { useState } from "react";
import EditModal from "@/components/EditModal";
import { useBookmarks } from "@/hooks/useBookmarks";
import { deleteBookmark, updateBookmark } from "@/utills/bookmarkUtils";

export default function BookmarksPage() {
  const [isEdit, setIsEdit] = useState(false);
  const { bookmarks, loading } = useBookmarks();
  const [element, setElement] = useState({});

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-zinc-500 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col bg-white dark:bg-black sm:items-start">
          {/* Header */}
          <header className="w-full py-4 px-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-black dark:text-white">
              Bookmarks
            </h1>
          </header>

          {/* Bookmark List */}
          <div className="w-full p-6 space-y-3">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition">
              + Add bookmark
            </div>
            {loading ? (
              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition">
                Loading...
              </div>
            ) : (
              bookmarks.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition"
                >
                  {/* Title Click */}
                  <span
                    onClick={() => window.open(item.url, "_blank")}
                    className="cursor-pointer text-lg font-semibold text-black dark:text-white"
                  >
                    {item.title}
                  </span>

                  <div className="flex gap-3">
                    {/* Edit Button */}
                    <button
                      onClick={() => {
                        setIsEdit(true);
                        setElement(item);
                      }}
                      className="text-blue-500 hover:text-blue-700 text-lg"
                      title="Edit"
                    >
                      ✏️
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => deleteBookmark(item.id)}
                      className="text-red-500 hover:text-red-700 text-lg"
                      title="Delete"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
      <EditModal
        closeModal={() => setIsEdit(false)}
        header="Edit Bookmark"
        isOpen={isEdit}
        bookmark={element}
      />
    </>
  );
}
