import React, { useState, useEffect } from "react";

const initialForm = {
  title: "",
  thumbnail: "",
  startDate: "",
  endDate: "",
  description: "",
  techStack: [],
  category: "MERN",
  liveUrl: "",
  githubUrl: "",
  caseStudyUrl: "",
  images: [],
  highlights: [],
  priority: 0,
};

// Define category options
const categoryOptions = [
  "MERN",
  "Data Engineer",
  "Data Analytics",
  "React",
  "Python",
  "Java",
  "Artificial Intelligence",
  "Machine Learning",
  "AWS",
  "SQL",
  "IT Support Projects",
];

export default function ProjectForm({ data, onSave, onCancel, mode = "create" }) {
  const [form, setForm] = useState({ ...initialForm, ...data });

  useEffect(() => {
    setForm({ ...initialForm, ...data });
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["techStack", "images", "highlights"].includes(name)) {
      setForm({ ...form, [name]: value.split(",").map((v) => v.trim()) });
    } else if (name === "priority") {
      setForm({ ...form, [name]: value === "" ? 0 : Number(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <>
      <style>
        {`
          .project-form::-webkit-scrollbar { display: none; }
          .project-form { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>

      <form
        onSubmit={handleSubmit}
        className="project-form grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[80vh] overflow-y-auto p-2"
      >
        {/* Title */}
        <div className="flex flex-col">
          <label className="text-sm font-medium">Title *</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Thumbnail */}
        <div className="flex flex-col">
          <label className="text-sm font-medium">Thumbnail URL</label>
          <input
            type="text"
            name="thumbnail"
            value={form.thumbnail}
            onChange={handleChange}
            className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Dates */}
        <div className="flex flex-col">
          <label className="text-sm font-medium">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={form.startDate ? form.startDate.slice(0, 10) : ""}
            onChange={handleChange}
            className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium">End Date</label>
          <input
            type="date"
            name="endDate"
            value={form.endDate ? form.endDate.slice(0, 10) : ""}
            onChange={handleChange}
            className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col col-span-1 md:col-span-2">
          <label className="text-sm font-medium">Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={3}
            className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Tech Stack */}
        <div className="flex flex-col">
          <label className="text-sm font-medium">Tech Stack (comma separated)</label>
          <input
            type="text"
            name="techStack"
            value={form.techStack.join(", ")}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
            className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="text-sm font-medium">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Links */}
        <div className="flex flex-col">
          <label className="text-sm font-medium">Live URL</label>
          <input
            type="text"
            name="liveUrl"
            value={form.liveUrl}
            onChange={handleChange}
            className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium">GitHub URL</label>
          <input
            type="text"
            name="githubUrl"
            value={form.githubUrl}
            onChange={handleChange}
            className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium">Case Study URL</label>
          <input
            type="text"
            name="caseStudyUrl"
            value={form.caseStudyUrl}
            onChange={handleChange}
            className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Images */}
        <div className="flex flex-col">
          <label className="text-sm font-medium">Images (comma separated)</label>
          <input
            type="text"
            name="images"
            value={form.images.join(", ")}
            onChange={handleChange}
            placeholder="https://example.com/img1.png, https://example.com/img2.png"
            className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Highlights */}
        <div className="flex flex-col">
          <label className="text-sm font-medium">Highlights (comma separated)</label>
          <input
            type="text"
            name="highlights"
            value={form.highlights.join(", ")}
            onChange={handleChange}
            placeholder="Optimized queries, Improved performance"
            className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Priority */}
        <div className="flex flex-col">
          <label className="text-sm font-medium">Priority</label>
          <input
            type="number"
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Buttons */}
        <div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-4 sticky bottom-0 bg-white dark:bg-gray-900 py-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            {mode === "create" ? "Add Project" : "Save Changes"}
          </button>
        </div>
      </form>
    </>
  );
}
