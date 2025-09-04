import React, { useState, useEffect } from "react";

export default function CertificationForm({
  data,
  onSave,
  onCancel,
  readOnly,
}) {
  const initialForm = {
    provider: "",
    title: "",
    issueDate: "",
    expiryDate: "",
    credentialId: "",
    verifyUrl: "",
    image: "",
    tags: [],
    category: "Other", // ✅ default value
    priority: 0,
    ...data,
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    setForm({ ...initialForm, ...data });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "tags") {
      const tags = value
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
      setForm({ ...form, tags });
    } else if (name === "priority") {
      setForm({ ...form, priority: value === "" ? 0 : Number(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSave === "function") {
      onSave(form);
    } else {
      console.warn(
        "⚠️ CertificationForm submitted but no onSave handler provided"
      );
    }
  };

  const handleCancel = () => {
    if (typeof onCancel === "function") {
      onCancel();
    } else {
      console.warn(
        "⚠️ CertificationForm cancel clicked but no onCancel handler provided"
      );
    }
  };

  const fields = [
    { name: "provider", label: "Provider", type: "text", required: true },
    { name: "title", label: "Title", type: "text", required: true },
    { name: "issueDate", label: "Issue Date", type: "date", required: true },
    { name: "expiryDate", label: "Expiry Date", type: "date" },
    { name: "credentialId", label: "Credential ID", type: "text" },
    { name: "verifyUrl", label: "Verification URL", type: "text" },
    { name: "image", label: "Badge Image URL", type: "text" },
    { name: "tags", label: "Tags (comma-separated)", type: "text" },
    { name: "priority", label: "Priority", type: "number" },
  ];

  const categories = [
    "NxtWave",
    "HackerRank",
    "Google",
    "Microsoft",
    "Meta",
    "Coursera Badges",
    "AWS",
    "MongoDB University",
    "Oracle SQL",
    "Other",
  ];

  const getFieldValue = (name, type) => {
    if (type === "date") {
      return form[name] ? String(form[name]).slice(0, 10) : "";
    }
    if (name === "tags") {
      return form.tags.join(", ");
    }
    return form[name] ?? "";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-4 max-h-[80vh] overflow-y-auto p-2"
    >
      {/* Normal fields */}
      {fields.map(({ name, label, type, required }) => (
        <div key={name} className="flex flex-col">
          <label className="text-sm font-medium">{label}</label>
          <input
            type={type}
            name={name}
            value={getFieldValue(name, type)}
            onChange={handleChange}
            required={required}
            readOnly={readOnly}
            className={`border px-3 py-2 rounded ${
              readOnly
                ? "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            }`}
          />
        </div>
      ))}

      {/* ✅ Category Dropdown */}
      <div className="flex flex-col">
        <label className="text-sm font-medium">Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          disabled={readOnly}
          className={`border px-3 py-2 rounded ${
            readOnly
              ? "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          }`}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      {!readOnly && (
        <div className="col-span-2 flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-sriBlue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      )}
    </form>
  );
}
