import React, { useState, useEffect } from "react";
import { SKILL_CATEGORIES } from "./SkillConstants";

// Optional: mapping keys to user-friendly labels
const CATEGORY_LABELS = {
  programming: "Programming",
  webdev: "Web Dev",
  database: "Database",
  frameworks: "Frameworks",
  libraries: "Libraries",
  tools: "Tools",
  others: "Others",
};

export default function SkillForm({ data, onSave, onCancel, readOnly }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    proficiency: 70,
    yearsExp: 0,
    tags: [],
    logo: "",
    priority: 0,
    ...data,
  });

  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    setFormData({
      name: "",
      category: "",
      proficiency: 70,
      yearsExp: 0,
      tags: [],
      logo: "",
      priority: 0,
      ...data,
    });
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e, field) => {
    const value = Number(e.target.value);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !formData.tags.includes(tag)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category) {
      alert("Please fill in the Name and Category fields.");
      return;
    }
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Skill Name */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Skill Name <span className="text-red-500">*</span>
        </label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., React.js"
          className="w-full border px-3 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          required
          readOnly={readOnly}
        />
      </div>

      {/* Category */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          required
          disabled={readOnly}
        >
          <option value="">Select Category</option>
          {SKILL_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {CATEGORY_LABELS[cat]}
            </option>
          ))}
        </select>
      </div>

      {/* Proficiency */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Proficiency ({formData.proficiency}%)
        </label>
        <input
          type="range"
          min="1"
          max="100"
          value={formData.proficiency}
          onChange={(e) => handleNumberChange(e, "proficiency")}
          className="w-full"
          disabled={readOnly}
        />
      </div>

      {/* Years of Experience */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Years of Experience
        </label>
        <input
          type="number"
          min="0"
          value={formData.yearsExp}
          onChange={(e) => handleNumberChange(e, "yearsExp")}
          className="w-full border px-3 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          readOnly={readOnly}
        />
      </div>

      {/* Priority */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Priority
        </label>
        <input
          type="number"
          min="0"
          value={formData.priority}
          onChange={(e) => handleNumberChange(e, "priority")}
          className="w-full border px-3 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          readOnly={readOnly}
        />
      </div>

      {/* Logo */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Logo URL
        </label>
        <input
          type="text"
          name="logo"
          value={formData.logo}
          onChange={handleChange}
          placeholder="https://..."
          className="w-full border px-3 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          readOnly={readOnly}
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Tags
        </label>
        <div className="flex gap-2 flex-wrap mb-2">
          {formData.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-indigo-100 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-200 rounded-full flex items-center gap-1"
            >
              {tag}
              {!readOnly && (
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-sm font-bold"
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>
        {!readOnly && (
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add a tag"
              className="flex-1 border px-3 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-3 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
            >
              Add
            </button>
          </div>
        )}
      </div>

      {/* Buttons */}
      {!readOnly && (
        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
          >
            Save
          </button>
        </div>
      )}
    </form>
  );
}
