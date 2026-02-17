"use client";

import { useState } from "react";
import { supabase } from "@/utills/supabase";
import notify from "@/utills/toastUtils";

export default function useGoogleLogin(domain) {
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${domain}/bookmarks`,
        },
      });

      if (error) throw error;

      notify.loginSuccess()
    } catch (err) {
      toast.error(err.message || "Login failed");
      setLoading(false);
    }
  };

  return { login, loading };
}
