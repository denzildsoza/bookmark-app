import { supabase } from "./supabase";
import notify from "./toastUtils";

// Get current user
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) throw new Error("User not logged in");
  return data.user;
};

const bookmarkTransaction = async ({ type, payload }) => {
  try {
    switch (type) {
      // ---------- ADD ----------
      case "ADD": {
        const user = await getCurrentUser();

        const { data, error } = await supabase
          .from("bookmarks")
          .insert({
            user_id: user.id,
            title: payload.title,
            url: payload.url,
          })
          .select()
          .single();

        if (error) throw error;
        notify.addSuccess()
        return data;
      }

      // ---------- UPDATE ----------
      case "UPDATE": {
        const { id, title, url } = payload;

        const { data, error } = await supabase
          .from("bookmarks")
          .update({
            title,
            url,
            updated_at: new Date(),
          })
          .eq("id", id)
          .select()
          .single();

        if (error) throw error;
        notify.updateSuccess()
        return data;
      }

      // ---------- DELETE ----------
      case "DELETE": {
        const { id } = payload;

        const { error } = await supabase
          .from("bookmarks")
          .delete()
          .eq("id", id)
          .select();

        if (error) throw error;
        notify.deleteSuccess()
        return { success: true };
      }

      default:
        throw new Error("Invalid transaction type");
    }
  } catch (err) {
    console.error("Bookmark transaction failed:", err);
    throw err;
  }
};
export default bookmarkTransaction;
