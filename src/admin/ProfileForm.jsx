import React, { useState, useEffect } from "react";

export default function ProfileForm({ data = {}, onSave, onCancel }) {
  // Default structure
  const defaultForm = {
    hero: { name: "", caption: "", description: "", profileImage: "" },
    about: {
      headline: "",
      bio: "",
      location: "",
      email: "",
      phone: "",
      resumeUrl: "",
      availability: "Open to opportunities",
    },
    social: {
      github: "",
      linkedin: "",
      twitter: "",
      telegram: "",
      facebook: "",
      gmail: "",
    },
  };

  // Deep merge function
  const mergeData = (defaults, incoming) => {
    return {
      hero: { ...defaults.hero, ...(incoming.hero || {}) },
      about: { ...defaults.about, ...(incoming.about || {}) },
      social: { ...defaults.social, ...(incoming.social || {}) },
    };
  };

  const [form, setForm] = useState(mergeData(defaultForm, data));
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setForm(mergeData(defaultForm, data));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleChange = (e, section = null) => {
    const { name, value } = e.target;
    if (section)
      setForm({ ...form, [section]: { ...form[section], [name]: value } });
    else setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSave(form);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const getDirectImageUrl = (url) => {
    if (!url) return "";
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)\//);
    if (match) return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    return url;
  };

  // Reusable Input component
  const InputField = ({ label, section, name, required = false, type = "text" }) => (
    <div className="flex flex-col">
      <label className="font-medium">
        {label} {required && "*"}
      </label>
      <input
        type={type}
        name={name}
        value={form[section]?.[name] || ""}
        onChange={(e) => handleChange(e, section)}
        required={required}
        className="border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-sriBlue-300"
      />
    </div>
  );

  const TextAreaField = ({ label, section, name, rows = 3, required = false }) => (
    <div className="flex flex-col">
      <label className="font-medium">
        {label} {required && "*"}
      </label>
      <textarea
        name={name}
        value={form[section]?.[name] || ""}
        onChange={(e) => handleChange(e, section)}
        rows={rows}
        required={required}
        className="border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-sriBlue-300"
      />
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[80vh] overflow-y-auto p-4 relative"
    >
      {/* Success Toast */}
      {success && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow z-50 animate-slide-in">
          Profile saved successfully!
        </div>
      )}

      {/* Hero Section */}
      <h3 className="col-span-1 md:col-span-2 font-bold text-lg mt-2">Hero Section</h3>
      <InputField label="Name" section="hero" name="name" required />
      <InputField label="Caption" section="hero" name="caption" required />
      <TextAreaField label="Description" section="hero" name="description" required />
      <InputField label="Profile Image URL" section="hero" name="profileImage" required />

      {/* Live Image Preview */}
      {form.hero?.profileImage && (
        <div className="col-span-1 md:col-span-2 flex justify-center mt-2">
          <img
            src={getDirectImageUrl(form.hero.profileImage)}
            alt="Profile Preview"
            className="h-32 w-32 object-cover rounded-full border hover:scale-105 transition-transform"
          />
        </div>
      )}

      {/* About Section */}
      <h3 className="col-span-1 md:col-span-2 font-bold text-lg mt-6">About Section</h3>
      <InputField label="Headline" section="about" name="headline" />
      <TextAreaField label="Bio" section="about" name="bio" required />
      <InputField label="Location" section="about" name="location" />
      <InputField label="Email" section="about" name="email" type="email" />
      <InputField label="Phone" section="about" name="phone" />
      <InputField label="Resume URL" section="about" name="resumeUrl" />

      {/* Social Section */}
      <h3 className="col-span-1 md:col-span-2 font-bold text-lg mt-6">Social Links</h3>
      {Object.keys(form.social).map((key) => (
        <InputField
          key={key}
          label={key.charAt(0).toUpperCase() + key.slice(1)}
          section="social"
          name={key}
        />
      ))}

      {/* Form Buttons */}
      <div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-sriBlue-600 text-white rounded hover:bg-sriBlue-700 transition"
        >
          Save
        </button>
      </div>
    </form>
  );
}
