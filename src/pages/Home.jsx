import React, { useEffect, useState } from "react";
import { motion} from "framer-motion";
import axios from "axios";

// Sections
import About from "./About";
import Projects from "./Projects";
import Skills from "./Skills";
import Education from "./Education";
import Experience from "./Experience";
import Certifications from "./Certifications";
import Contact from "./Contact";

// Global loader
import { useLoading } from "../Context/LoadingContext";

export default function Home() {
  const { loading } = useLoading();
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/api/profile");
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setProfileLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const hero = profile?.hero || {};

  // Motion variants
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Loading state (global + local profile)
  if (loading || profileLoading) {
    return (
      <motion.div
        key="loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 dark:bg-black/50"
      >
        <div className="border-t-4 border-b-4 border-sriBlue-500 rounded-full animate-spin w-16 h-16"></div>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col relative bg-gradient-to-b from-sriBlue-50 via-white to-sriTeal-50 dark:from-sriBlue-950 dark:via-gray-900 dark:to-sriTeal-900">
      {/* Hero Section */}
      <motion.section
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative flex flex-col md:flex-row items-center justify-between gap-8 px-6 md:px-12 py-12 md:py-16 overflow-hidden"
      >
        {/* Left - Text */}
        <div className="flex-1 mt-0">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            Hi, I am{" "}
            <span className="text-sriBlue-500 dark:text-sriBlue-400">
              {hero.name || "Sri Nitish"}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6">
            {hero.caption ||
              "Full-Stack Developer 🚀 | Data Engineer 📊 | Problem Solver 💡"}
          </p>
          <div className="flex gap-4 mt-2 flex-wrap">
            <a
              href="#projects"
              className="px-6 py-2 bg-sriBlue-500 text-white rounded-lg shadow-md hover:bg-sriBlue-600 transition"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-2 border border-sriBlue-500 text-sriBlue-500 rounded-lg hover:bg-sriBlue-50 dark:hover:bg-sriBlue-800 transition"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Right - Profile */}
        <div className="flex-1 flex justify-center mt-6 md:mt-0">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden hero-glow float-y shadow-xl border-4 border-sriBlue-200 dark:border-sriBlue-700">
            <img
              src={hero.profileImage || "/assets/profile.jpg"}
              alt={hero.name || "Profile"}
              loading="lazy"
              decoding="async"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </motion.section>

      {/* Other Sections */}
      {[
        { id: "about", component: <About /> },
        { id: "projects", component: <Projects /> },
        { id: "skills", component: <Skills /> },
        { id: "education", component: <Education /> },
        { id: "experience", component: <Experience /> },
        { id: "certifications", component: <Certifications /> },
        { id: "contact", component: <Contact /> },
      ].map((section) => (
        <motion.section
          key={section.id}
          id={section.id}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="px-6 md:px-12 py-8 md:py-12"
        >
          {section.component}
        </motion.section>
      ))}
    </div>
  );
}
