import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import ContactImg from '../assets/undraw_message-sent_785q.png'

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      await axios.post("/api/messages", form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Message submission failed:", err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const rightPanelVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const inputVariants = {
    focused: { scale: 1.02, transition: { duration: 0.2 } },
    unfocused: { scale: 1 },
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Banner */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Let's Talk
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-300 text-lg">
          Have a question, project idea, or just want to say hi? I’d love to hear from you.
        </p>
      </div>

      {/* Form + Info Panel */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left: Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-8 flex-1 space-y-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {["name", "email"].map((field) => (
              <motion.div
                key={field}
                initial="unfocused"
                whileFocus="focused"
                variants={inputVariants}
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{field}</label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </motion.div>
            ))}
          </div>

          {/* Subject */}
          <motion.div initial="unfocused" whileFocus="focused" variants={inputVariants}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </motion.div>

          {/* Message */}
          <motion.div initial="unfocused" whileFocus="focused" variants={inputVariants}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="5"
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </motion.div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition transform hover:-translate-y-1 hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="text-green-600 dark:text-green-400 text-center mt-3">Message sent successfully ✅</p>
          )}
          {status === "error" && (
            <p className="text-red-600 dark:text-red-400 text-center mt-3">
              Oops! Something went wrong. Please try again.
            </p>
          )}
        </form>

        {/* Right: Info / Illustration Panel */}
        <motion.div
          className="flex-1 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 flex flex-col justify-center items-start space-y-6"
          initial="hidden"
          animate="visible"
          variants={rightPanelVariants}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Info</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Feel free to reach out through any of the methods below:
          </p>

          <div className="space-y-4 text-gray-800 dark:text-gray-200">
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-blue-500" /> <span>+91 8008615514</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-blue-500" /> <span>nitishkamisetti123@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-blue-500" /> <span>Kakinada, Andhra Pradhesh, India</span>
            </div>
          </div>

          <div className="mt-6">
            <img
              src={ContactImg}
              alt="Contact illustration"
              className="w-full max-w-xs"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
