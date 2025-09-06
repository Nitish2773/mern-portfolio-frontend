import React, { useState, useEffect } from "react";

export default function ProfileForm({ data = {}, onSave, onCancel }) {
  // Flatten incoming data for editing
  const flattenData = (incoming) => ({
    hero_name: incoming.hero?.name || "",
    hero_caption: incoming.hero?.caption || "",
    hero_description: incoming.hero?.description || "",
    hero_profileImage: incoming.hero?.profileImage || "",
    about_headline: incoming.about?.headline || "",
    about_bio: incoming.about?.bio || "",
    about_location: incoming.about?.location || "",
    about_email: incoming.about?.email || "",
    about_phone: incoming.about?.phone || "",
    about_resumeUrl: incoming.about?.resumeUrl || "",
    about_availability: incoming.about?.availability || "Open to opportunities",
    social_github: incoming.social?.github || "",
    social_linkedin: incoming.social?.linkedin || "",
    social_twitter: incoming.social?.twitter || "",
    social_telegram: incoming.social?.telegram || "",
    social_facebook: incoming.social?.facebook || "",
  });

  const [form, setForm] = useState(flattenData(data));
  const [success, setSuccess] = useState(false);

  useEffect(() => setForm(flattenData(data)), [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nestedData = {
      hero: {
        name: form.hero_name,
        caption: form.hero_caption,
        description: form.hero_description,
        profileImage: form.hero_profileImage,
      },
      about: {
        headline: form.about_headline,
        bio: form.about_bio,
        location: form.about_location,
        email: form.about_email,
        phone: form.about_phone,
        resumeUrl: form.about_resumeUrl,
        availability: form.about_availability,
      },
      social: {
        github: form.social_github,
        linkedin: form.social_linkedin,
        twitter: form.social_twitter,
        telegram: form.social_telegram,
        facebook: form.social_facebook,
      },
    };
    try {
      await onSave(nestedData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const getDirectImageUrl = (url) => {
    if (!url) return "";
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)\//);
    return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : url;
  };

  const InputField = ({ label, name, required = false, type = "text" }) => (
    <div className="flex flex-col">
      <label className="font-medium">{label} {required && "*"}</label>
      <input
        type={type}
        name={name}
        value={form[name] || ""}
        onChange={handleChange}
        required={required}
        className="border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-sriBlue-300"
      />
    </div>
  );

  const TextAreaField = ({ label, name, rows = 3, required = false }) => (
    <div className="flex flex-col">
      <label className="font-medium">{label} {required && "*"}</label>
      <textarea
        name={name}
        value={form[name] || ""}
        onChange={handleChange}
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
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow z-50 transition-transform transform">
          Profile saved successfully!
        </div>
      )}

      {/* Hero Section */}
      <h3 className="col-span-1 md:col-span-2 font-bold text-lg mt-2">Hero Section</h3>
      <InputField label="Name" name="hero_name" required />
      <InputField label="Caption" name="hero_caption" required />
      <TextAreaField label="Description" name="hero_description" required />
      <InputField label="Profile Image URL" name="hero_profileImage" required />

      {form.hero_profileImage && (
        <div className="col-span-1 md:col-span-2 flex justify-center mt-2">
          <img
            src={getDirectImageUrl(form.hero_profileImage)}
            alt="Profile Preview"
            className="h-32 w-32 object-cover rounded-full border hover:scale-105 transition-transform"
          />
        </div>
      )}

      {/* About Section */}
      <h3 className="col-span-1 md:col-span-2 font-bold text-lg mt-6">About Section</h3>
      <InputField label="Headline" name="about_headline" />
      <TextAreaField label="Bio" name="about_bio" required />
      <InputField label="Location" name="about_location" />
      <InputField label="Email" name="about_email" type="email" />
      <InputField label="Phone" name="about_phone" />
      <InputField label="Resume URL" name="about_resumeUrl" />
      <InputField label="Availability" name="about_availability" />

      {/* Social Section */}
      <h3 className="col-span-1 md:col-span-2 font-bold text-lg mt-6">Social Links</h3>
      {[
        "social_github",
        "social_linkedin",
        "social_twitter",
        "social_telegram",
        "social_facebook",
      ].map((key) => (
        <InputField
          key={key}
          label={key.replace("social_", "").replace(/^\w/, (c) => c.toUpperCase())}
          name={key}
        />
      ))}

      {/* Buttons */}
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
