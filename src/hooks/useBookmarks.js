"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utills/supabase";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let channel;

    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Initial fetch
      const { data } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setBookmarks(data || []);
      setLoading(false);

      // Realtime updates
      channel = supabase
        .channel("bookmarks-changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "bookmarks",
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            setBookmarks((prev) => {
              if (payload.eventType === "INSERT")
                return [payload.new, ...prev];

              if (payload.eventType === "UPDATE")
                return prev.map((b) =>
                  b.id === payload.new.id ? payload.new : b
                );

              if (payload.eventType === "DELETE")
                return prev.filter((b) => b.id !== payload.old.id);

              return prev;
            });
          }
        )
        .subscribe();
    };

    init();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, []);

  return { bookmarks, loading };
}
