import { redirect } from "next/navigation";
import { supabase } from "@/utills/supabase";

export default async function Home() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/bookmarks");
  } else {
    redirect("/login"); //send unauthenticated users to login
  }
}