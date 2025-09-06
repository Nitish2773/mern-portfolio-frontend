// frontend/src/pages/Skills.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

// Brand-aligned categories
const categories = [
  { key: "all", label: "All" },
  { key: "programming", label: "Programming" },
  { key: "webdev", label: "Web Dev" },
  { key: "database", label: "Database" },
  { key: "frameworks", label: "Frameworks" },
  { key: "libraries", label: "Libraries" },
  { key: "tools", label: "Tools" },
  { key: "others", label: "Others" },
];

// Skeleton loader
function SkillsSkeleton({ count = 12 }) {
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-3 sm:gap-5">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"
        />
      ))}
    </div>
  );
}

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy] = useState("priority");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        let url = `${process.env.REACT_APP_API_BASE}/api/skills?sortBy=${sortBy}&order=desc`;
        if (activeCategory !== "all") url += `&category=${encodeURIComponent(activeCategory)}`;
        const res = await axios.get(url);
        setSkills(res.data || []);
      } catch (err) {
        console.error("Error fetching skills:", err);
        setSkills([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, [activeCategory, sortBy]);

  return (
    <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-8">
        {/* Heading */}
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Skills
        </motion.h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 w-full">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full font-medium text-sm sm:text-base transition-all duration-300 ${
                activeCategory === cat.key
                  ? "bg-sriBlue-500 dark:bg-sriTeal-500 text-white shadow-md scale-105"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-sriBlue-100 dark:hover:bg-sriTeal-600"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills */}
        {loading ? (
          <SkillsSkeleton />
        ) : skills.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-6">
            🚧 No skills available yet.
          </p>
        ) : (
          <div className="mt-4 flex flex-wrap justify-center gap-3 sm:gap-5">
            {skills.map((skill, idx) => (
              <motion.div
                key={skill._id}
                className="flex items-center justify-center p-3 sm:p-4 rounded-full cursor-pointer
                  bg-gradient-to-tr from-sriBlue-500 via-sriTeal-500 to-sriBlue-600
                  dark:from-sriTeal-600 dark:via-sriBlue-700 dark:to-sriTeal-700
                  shadow-sm dark:shadow-md"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05, type: "spring", stiffness: 200 }}
                whileHover={{
                  scale: 1.15,
                  boxShadow:
                    "0 6px 15px rgba(37,99,235,0.2), 0 6px 25px rgba(14,165,164,0.25)",
                }}
                aria-label={skill.name}
              >
                {skill.logo && (
                  <motion.img
                    src={skill.logo}
                    alt={skill.name}
                    className="w-10 h-10 sm:w-12 sm:h-12"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
