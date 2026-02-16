"use client";

export default function FormInput({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>

      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={() => onBlur(name)}
        className={`px-3 py-2 rounded-lg border
          ${error ? "border-red-500" : "border-gray-300"}
        `}
      />

      {error && (
        <p className="text-red-500 text-xs">{error}</p>
      )}
    </div>
  );
}
