import React, { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

// Lazy-loaded sections
const About = lazy(() => import("./About"));
const Projects = lazy(() => import("./Projects"));
const Skills = lazy(() => import("./Skills"));
const Education = lazy(() => import("./Education"));
const Experience = lazy(() => import("./Experience"));
const Certifications = lazy(() => import("./Certifications"));
const Contact = lazy(() => import("./Contact"));

// ----------------------
// Hero Skeleton
// ----------------------
function ProfileSkeleton() {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between gap-6 px-4 sm:px-6 md:px-12 py-8 md:py-12">
      <div className="flex-1 space-y-4">
        <div className="h-6 w-3/4 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-5 w-full bg-gray-300 rounded animate-pulse"></div>
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <div className="h-10 w-full sm:w-32 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-10 w-full sm:w-32 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="flex-1 flex justify-center mt-6 md:mt-0">
        <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full bg-gray-300 animate-pulse"></div>
      </div>
    </section>
  );
}

// ----------------------
// Home Component
// ----------------------
export default function Home() {
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE}/api/profile`);
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

  // Show skeleton while profile is loading
  if (profileLoading) return <ProfileSkeleton />;

  return (
    <div className="flex flex-col relative bg-gradient-to-b from-sriBlue-50 via-white to-sriTeal-50 dark:from-sriBlue-950 dark:via-gray-900 dark:to-sriTeal-900">
      
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="relative flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 px-4 sm:px-6 md:px-12 py-8 sm:py-12 md:py-16 overflow-hidden"
      >
        <div className="flex-1 mt-0 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-3 sm:mb-4 leading-snug sm:leading-tight">
            Hi, I am <span className="text-sriBlue-500 dark:text-sriBlue-400">{hero.name || "Sri Nitish"}</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-4 sm:mb-6">
            {hero.caption || "Full-Stack Developer 🚀 | Data Engineer 📊 | Problem Solver 💡"}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-3 sm:mt-4 justify-center md:justify-start">
            <button onClick={() => scrollToSection("projects")} className="w-full sm:w-auto px-6 py-2 bg-sriBlue-500 text-white rounded-lg shadow-md hover:bg-sriBlue-600 transition text-center">
              View Projects
            </button>
            <button onClick={() => scrollToSection("contact")} className="w-full sm:w-auto px-6 py-2 border border-sriBlue-500 text-sriBlue-500 rounded-lg hover:bg-sriBlue-50 dark:hover:bg-sriBlue-800 transition text-center">
              Contact Me
            </button>
          </div>
        </div>

        <div className="flex-1 flex justify-center mt-6 md:mt-0">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full hero-glow float-y shadow-xl border-4 border-sriBlue-200 dark:border-sriBlue-700 overflow-hidden">
            <img src={hero.profileImage || "/assets/profile.jpg"} alt={hero.name || "Profile"} className="object-cover w-full h-full" />
          </div>
        </div>
      </motion.section>

      {/* Lazy-loaded Sections with Suspense skeleton fallback */}
      <Suspense fallback={null}>
        <About />
        <Projects />
        <Skills />
        <Education />
        <Experience />
        <Certifications />
        <Contact />
      </Suspense>
    </div>
  );
}

// ----------------------
// Scroll helper
// ----------------------
const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};
