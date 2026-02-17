"use client";

import { useEffect, useState } from "react";
import Modal from "./molecules/ModalWrapper";
import FormInput from "./atoms/FormInput";
import bookmarkTransaction from "@/utills/bookmarkUtils";
import notify from "@/utills/toastUtils";

// ✅ Better URL validator
function isValidURL(url) {
  try {
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url; // auto add protocol
    }
    const parsed = new URL(url);
    return parsed.hostname.includes(".");
  } catch {
    return false;
  }
}

export default function EditModal({
  isOpen,
  closeModal,
  bookmark,
  header,
  transaction,
}) {
  const [values, setValues] = useState({ title: "", url: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (bookmark) {
      setValues({
        title: bookmark.title || "",
        url: bookmark.url || "",
      });
      setErrors({});
      setTouched({});
    }
  }, [bookmark]);

  const validate = (vals) => {
    const e = {};

    if (!vals.title.trim()) e.title = "Title required";

    if (!vals.url.trim()) e.url = "URL required";
    else if (!isValidURL(vals.url)) e.url = "Invalid URL";

    return e;
  };

  const handleChange = (name, value) => {
    const newVals = { ...values, [name]: value };
    setValues(newVals);

    if (touched[name]) setErrors(validate(newVals));
  };

  const handleBlur = (name) => {
    setTouched((p) => ({ ...p, [name]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = async () => {
    const newErrors = validate(values);
    setErrors(newErrors);
    setTouched({ title: true, url: true });

    if (Object.keys(newErrors).length) return;

    let finalUrl = values.url;
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = "https://" + finalUrl;
    }

    //Check if nothing changed
    const noChanges =
      values.title === bookmark.title && finalUrl === bookmark.url;

    if (noChanges) {
      notify.inform("Nothing was modified.");
      closeModal(); // optional
      return;
    }

    await bookmarkTransaction({
      type: transaction,
      payload: {
        id: bookmark.id,
        title: values.title,
        url: finalUrl,
      },
    });

    closeModal(); // optional
  };

  const hasErrors =
    Object.values(errors).some(Boolean) || !values.title || !values.url;

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      header={header}
      action={handleSubmit}
      isDisable={hasErrors}
    >
      <div className="space-y-4 mt-4">
        <FormInput
          label="Title"
          name="title"
          type="title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.title ? errors.title : ""}
        />

        <FormInput
          label="URL"
          name="url"
          type="url"
          value={values.url}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.url ? errors.url : ""}
        />
      </div>
    </Modal>
  );
}
