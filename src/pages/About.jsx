// frontend/src/pages/About.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaFileDownload,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaTelegram,
  FaFacebook,
} from "react-icons/fa";

// Import your animated/static image
import DataEngineerImg from "../assets/data-engineer.jpg";

export default function About() {
  const [profile, setProfile] = useState(null);
  const [expanded, setExpanded] = useState(false); // 🔹 for Read More toggle
  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE}/api/profile` // ✅ fixed
        );
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    }
    fetchProfile();
  }, []);

  if (!profile) return null;

  const { about, social, hero } = profile;
  const shortBio = about.bio?.slice(0, 250); // show only first 250 chars initially

  return (
    <motion.section
      className="flex flex-col md:flex-row items-start md:items-stretch gap-12 py-12 md:py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left Column */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-5 text-sriBlue-600 dark:text-sriTeal-300">
          {about.headline || "About Me"}
        </h2>

        {/* 🔹 Collapsible Bio */}
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 max-w-2xl">
          {expanded ? about.bio : `${shortBio}...`}
          {about.bio?.length > 250 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="ml-2 text-sriBlue-500 hover:underline font-medium"
            >
              {expanded ? "Read Less" : "Read More"}
            </button>
          )}
        </p>

        <div className="space-y-4 text-gray-600 dark:text-gray-300 text-md md:text-lg">
          {about.location && (
            <div className="flex items-center gap-3 hover:text-sriBlue-500 transition">
              <FaMapMarkerAlt className="text-sriBlue-500" />
              {about.location}
            </div>
          )}
          {about.email && (
            <div className="flex items-center gap-3 hover:text-sriBlue-500 transition">
              <FaEnvelope className="text-sriBlue-500" />
              {about.email}
            </div>
          )}
          {about.phone && (
            <div className="flex items-center gap-3 hover:text-sriBlue-500 transition">
              <FaPhone className="text-sriBlue-500" />
              {about.phone}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-8">
          {about.resumeUrl && (
            <a
              href={about.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-sriBlue-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-sriBlue-600 transition transform hover:-translate-y-1"
            >
              <FaFileDownload /> Resume
            </a>
          )}
          {about.availability && (
            <span className="px-5 py-2 rounded-xl border border-sriBlue-500 text-sriBlue-500 font-medium text-sm md:text-md">
              {about.availability}
            </span>
          )}
        </div>
      </motion.div>

      {/* Right Column (unchanged) */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1 flex flex-col items-center text-center gap-6"
      >
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-64 h-64 md:w-72 md:h-72 rounded-3xl shadow-2xl border-2 border-sriBlue-300 dark:border-sriBlue-700 overflow-hidden bg-gradient-to-br from-sriBlue-100 to-sriTeal-50 dark:from-sriBlue-900 dark:to-sriTeal-900"
        >
          <img
            src={DataEngineerImg}
            alt="Data Engineer"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200">
          {hero?.name || "Sri Nitish"}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 font-medium text-lg md:text-xl">
          {hero?.caption || "Full-Stack Developer | Data Engineer"}
        </p>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          {hero?.description}
        </p>

        <div className="flex flex-wrap justify-center gap-5 text-gray-500 dark:text-gray-400 text-2xl mt-6">
          {social.github && (
            <a
              href={social.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-sriBlue-500 transform hover:scale-125"
            >
              <FaGithub />
            </a>
          )}
          {social.linkedin && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-sriBlue-500 transform hover:scale-125"
            >
              <FaLinkedin />
            </a>
          )}
          {social.twitter && (
            <a
              href={social.twitter}
              target="_blank"
              rel="noreferrer"
              className="hover:text-sriBlue-500 transform hover:scale-125"
            >
              <FaTwitter />
            </a>
          )}
          {social.telegram && (
            <a
              href={social.telegram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-sriBlue-500 transform hover:scale-125"
            >
              <FaTelegram />
            </a>
          )}
          {social.facebook && (
            <a
              href={social.facebook}
              target="_blank"
              rel="noreferrer"
              className="hover:text-sriBlue-500 transform hover:scale-125"
            >
              <FaFacebook />
            </a>
          )}
        </div>
      </motion.div>
    </motion.section>
  );
}
