import { supabase } from "./supabase";

// Get current user
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) throw new Error("User not logged in");
  return data.user;
};

// Add bookmark
export const addBookmark = async ({ title, url }) => {
  const user = await getCurrentUser();

  const { data, error } = await supabase.from("bookmarks").insert({
    user_id: user.id,
    title,
    url,
  });

  if (error) throw error;

  return data;
};

export const updateBookmark = async (id, { title, url }) => {
  const { error, data } = await supabase
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

  return data;
};

// Delete bookmark
export const deleteBookmark = async (id) => {
  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("id", id);
  
  if (error) throw error;
};
