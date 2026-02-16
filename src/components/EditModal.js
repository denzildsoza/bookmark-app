"use client";

import { useEffect, useState } from "react";
import Modal from "./molecules/ModalWrapper";
import FormInput from "./atoms/FormInput";

const urlRegex =
  /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i;

export default function EditModal({
  isOpen,
  closeModal,
  bookmark,
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
    else if (!urlRegex.test(vals.url)) e.url = "Invalid URL";
    return e;
  };

  const handleChange = (name, value) => {
    const newVals = { ...values, [name]: value };
    setValues(newVals);

    if (touched[name])
      setErrors(validate(newVals));
  };

  const handleBlur = (name) => {
    setTouched((p) => ({ ...p, [name]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = () => {
    const newErrors = validate(values);
    setErrors(newErrors);
    setTouched({ title: true, url: true });

    if (Object.keys(newErrors).length) return;

    console.log("Submit:", values);
  };

  const hasErrors =
    Object.values(errors).some(Boolean) ||
    !values.title ||
    !values.url;

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      header="Edit Bookmark"
      action={handleSubmit}
      isDisable={hasErrors}
    >
      <div className="space-y-4 mt-4">

        <FormInput
          label="Title"
          name="title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.title ? errors.title : ""}
        />

        <FormInput
          label="URL"
          name="url"
          value={values.url}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.url ? errors.url : ""}
        />

      </div>
    </Modal>
  );
}
