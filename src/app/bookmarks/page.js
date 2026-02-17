"use client";

import { useState } from "react";
import EditModal from "@/components/EditModal";
import { useBookmarks } from "@/hooks/useBookmarks";
import bookmarkTransaction from "@/utills/bookmarkUtils";

export default function BookmarksPage() {
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const { bookmarks, loading } = useBookmarks();
  const [element, setElement] = useState({});

  return (
    <>
      {/* Background */}
      <div className="min-h-screen bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-black p-6 flex justify-center">
        {/* Width Limited Container */}
        <div className="h-[calc(100vh-3rem)] w-full max-w-5xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl rounded-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <header className="flex items-center justify-between px-8 py-6 border-b border-zinc-200 dark:border-zinc-800">
            <h1 className="text-2xl font-semibold text-zinc-800 dark:text-white">
              🔖 Your Bookmarks
            </h1>

            <button
              onClick={() => setIsAdd(true)}
              className="px-5 py-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-black hover:opacity-90 transition shadow-sm"
            >
              + Add Bookmark
            </button>
          </header>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-8 space-y-4">
            {loading ? (
              <div className="p-5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-center">
                Loading bookmarks...
              </div>
            ) : bookmarks.length === 0 ? (
              <div className="text-center py-20 text-zinc-500 dark:text-zinc-400">
                No bookmarks yet. Click <b>Add Bookmark</b> to start ✨
              </div>
            ) : (
              bookmarks.map((item) => (
                <div
                  key={item.id}
                  className="group flex items-center justify-between p-5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition shadow-sm hover:shadow-md"
                >
                  <div
                    onClick={() => window.open(item.url, "_blank")}
                    className="cursor-pointer"
                  >
                    <p className="font-semibold text-lg text-zinc-800 dark:text-white group-hover:underline">
                      {item.title}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate max-w-xl">
                      {item.url}
                    </p>
                  </div>

                  <div className="flex gap-3 opacity-80 group-hover:opacity-100">
                    <button
                      onClick={() => {
                        setIsEdit(true);
                        setElement(item);
                      }}
                      className="px-3 py-1 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                    >
                      ✏️
                    </button>

                    <button
                      onClick={async () =>
                        await bookmarkTransaction({
                          type: "DELETE",
                          payload: { id: item.id },
                        })
                      }
                      className="px-3 py-1 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <EditModal
        isOpen={isEdit}
        closeModal={() => setIsEdit(false)}
        bookmark={element}
        header="Edit Bookmark"
        transaction="UPDATE"
      />

      <EditModal
        isOpen={isAdd}
        closeModal={() => setIsAdd(false)}
        bookmark={{}}
        header="Add Bookmark"
        transaction="ADD"
      />
    </>
  );
}
