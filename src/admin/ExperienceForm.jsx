import React, { useState, useEffect } from "react";

export default function ExperienceForm({ data, onSave, onCancel }) {
  const initialForm = {
    logo: "",
    company: "",
    role: "",
    location: "",
    startDate: "",
    endDate: "",
    responsibilities: [],
    skills: [],
    description: "",
    certificateUrl: "",
    priority: 0,
    ...data,
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    setForm({
      logo: "",
      company: "",
      role: "",
      location: "",
      startDate: "",
      endDate: "",
      responsibilities: [],
      skills: [],
      description: "",
      certificateUrl: "",
      priority: 0,
      ...data,
    });
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["responsibilities", "skills"].includes(name)) {
      const arr = value
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
      setForm({ ...form, [name]: arr });
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
      console.warn("⚠️ ExperienceForm submitted but no onSave handler provided");
    }
  };

  const handleCancel = () => {
    if (typeof onCancel === "function") {
      onCancel();
    } else {
      console.warn("⚠️ ExperienceForm cancel clicked but no onCancel handler provided");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-4 max-h-[80vh] overflow-y-auto p-2"
    >
      <div className="flex flex-col">
        <label className="text-sm font-medium">Company *</label>
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium">Role *</label>
        <input
          type="text"
          name="role"
          value={form.role}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium">Location</label>
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium">Start Date *</label>
        <input
          type="date"
          name="startDate"
          value={form.startDate ? form.startDate.slice(0, 10) : ""}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium">End Date</label>
        <input
          type="date"
          name="endDate"
          value={form.endDate ? form.endDate.slice(0, 10) : ""}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium">Logo URL</label>
        <input
          type="text"
          name="logo"
          value={form.logo}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium">Responsibilities (comma-separated)</label>
        <input
          type="text"
          name="responsibilities"
          value={form.responsibilities.join(", ")}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium">Skills (comma-separated)</label>
        <input
          type="text"
          name="skills"
          value={form.skills.join(", ")}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
      </div>

      <div className="flex flex-col col-span-2">
        <label className="text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          rows={3}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium">Certificate URL</label>
        <input
          type="text"
          name="certificateUrl"
          value={form.certificateUrl}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium">Priority</label>
        <input
          type="number"
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
      </div>

      {/* Action buttons */}
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
    </form>
  );
}
