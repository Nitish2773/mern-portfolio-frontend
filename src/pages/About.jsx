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
import DataEngineerImg from "../assets/data-engineer.jpg";

// ----------------------
// Skeleton Loader
// ----------------------
function AboutSkeleton() {
  return (
    <section className="flex flex-col md:flex-row items-center gap-8 px-4 py-8 md:py-12">
      {/* Left column */}
      <div className="flex-1 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-4 animate-pulse">
        <div className="h-6 w-1/3 bg-gray-400 rounded"></div>
        <div className="h-4 w-full bg-gray-300 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
        <div className="h-6 w-1/4 bg-gray-400 rounded mt-4"></div>
      </div>
      {/* Right column */}
      <div className="flex-1 flex flex-col items-center gap-6 animate-pulse">
        <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-2xl bg-gray-300"></div>
        <div className="h-6 w-1/3 bg-gray-400 rounded"></div>
        <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
        <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
      </div>
    </section>
  );
}

// ----------------------
// Main Component
// ----------------------
export default function About() {
  const [profile, setProfile] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE}/api/profile`
        );
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    }
    fetchProfile();
  }, []);

  if (!profile) return <AboutSkeleton />;

  const { about, social, hero } = profile;
  const shortBio = about.bio?.slice(0, 180); // shorter for mobile

  return (
    <motion.section
      className="flex flex-col md:flex-row items-center gap-8 px-4 sm:px-6 md:px-12 py-8 sm:py-12 md:py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left Column */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 text-center md:text-left"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-sriBlue-600 dark:text-sriTeal-300">
          {about.headline || "About Me"}
        </h2>

        {/* Collapsible Bio */}
        <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          {expanded ? about.bio : `${shortBio}...`}
          {about.bio?.length > 180 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="ml-1 text-sriBlue-500 hover:underline font-medium"
            >
              {expanded ? "Read Less" : "Read More"}
            </button>
          )}
        </p>

        {/* Contact Info */}
        <div className="space-y-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
          {about.location && (
            <div className="flex items-center justify-center md:justify-start gap-2 hover:text-sriBlue-500 transition">
              <FaMapMarkerAlt className="text-sriBlue-500" />
              {about.location}
            </div>
          )}
          {about.email && (
            <div className="flex items-center justify-center md:justify-start gap-2 hover:text-sriBlue-500 transition">
              <FaEnvelope className="text-sriBlue-500" />
              {about.email}
            </div>
          )}
          {about.phone && (
            <div className="flex items-center justify-center md:justify-start gap-2 hover:text-sriBlue-500 transition">
              <FaPhone className="text-sriBlue-500" />
              {about.phone}
            </div>
          )}
        </div>

        {/* Resume / Availability */}
        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 mt-6">
          {about.resumeUrl && (
            <a
              href={about.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-sriBlue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-sriBlue-600 transition text-sm sm:text-base justify-center"
            >
              <FaFileDownload /> Resume
            </a>
          )}
          {about.availability && (
            <span className="px-4 py-2 rounded-lg border border-sriBlue-500 text-sriBlue-500 font-medium text-sm sm:text-base">
              {about.availability}
            </span>
          )}
        </div>
      </motion.div>

      {/* Right Column - Image & Social */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1 flex flex-col items-center gap-4 mt-6 md:mt-0"
      >
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-48 h-48 sm:w-64 sm:h-64 rounded-2xl shadow-xl border-2 border-sriBlue-300 dark:border-sriBlue-700 overflow-hidden bg-gradient-to-br from-sriBlue-100 to-sriTeal-50 dark:from-sriBlue-900 dark:to-sriTeal-900"
        >
          <img
            src={"/assets/data-engineer.jpg" || DataEngineerImg}
            alt="Data Engineer"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>

        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 text-center">
          {hero?.name || "Sri Nitish"}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 font-medium text-sm sm:text-base md:text-lg text-center">
          {hero?.caption || "Full-Stack Developer | Data Engineer"}
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-xs sm:max-w-sm text-center">
          {hero?.description}
        </p>

        {/* Social Icons */}
        <div className="flex flex-wrap justify-center gap-4 text-gray-500 dark:text-gray-400 text-xl mt-4">
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
