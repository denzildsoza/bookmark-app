"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utills/supabase";
import { useRouter } from "next/navigation";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // fetch bookmarks
  const fetchBookmarks = async () => {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setBookmarks(data);
    setLoading(false);
  };

  // check login + load bookmarks
  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.push("/");
        return;
      }

      fetchBookmarks();
    };

    init();
  }, []);

  return {
    bookmarks,
    loading,
    refresh: fetchBookmarks,
  };
}
