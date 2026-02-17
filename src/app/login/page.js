"use client";

import useRedirectIfAuthenticated from "@/hooks/useRedirectIfAuthenticated";
import { supabase } from "@/utills/supabase";
import { useState } from "react";

export default function Login() {
  const [loading, setLoading] = useState(false);
  useRedirectIfAuthenticated();
  const login = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: "http://localhost:3000/bookmarks" },
    });
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-black px-4">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 shadow-xl border border-zinc-200 dark:border-zinc-800 p-10">
        {/* Logo */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="text-3xl font-bold text-zinc-800 dark:text-white">
            🔖 Bookmark Hub
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            Save and organize your favorite links
          </p>
        </div>

        <h1 className="text-xl font-semibold text-center text-zinc-800 dark:text-white mb-6">
          Login or Signup
        </h1>

        <button
          onClick={login}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition shadow-sm hover:shadow-md"
        >
          <img
            className="w-5 h-5"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
          />
          <span className="font-medium text-zinc-700 dark:text-zinc-200">
            {loading ? "Redirecting..." : "Continue with Google"}
          </span>
        </button>

        <p className="text-xs text-center text-zinc-500 dark:text-zinc-400 mt-6">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
