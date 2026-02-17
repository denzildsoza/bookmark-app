import { toast } from "react-toastify";

 const notify = {
  loginSuccess: () =>
    toast.success("🎉🥳 Welcome! you are logged in ✨"),

  addSuccess: () =>
    toast.success("🎉📌 Bookmark added successfully! 🚀"),

  updateSuccess: () =>
    toast.success("🎊✏️ Bookmark updated! Nice work 😎"),

  deleteSuccess: () =>
    toast.success("🗑️✨ Bookmark removed. Clean and tidy! 🎉"),

  inform: (msg) =>
    toast.success(`${msg}`),
  failed: (msg) =>
    toast.error(`${msg?msg:"Error Occured"}`),
};
export default notify