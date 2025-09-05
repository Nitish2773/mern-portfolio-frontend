import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const categories = [
  { key: "all", label: "All" },
  { key: "Programming", label: "Programming" },
  { key: "Web Dev", label: "Web Dev" },
  { key: "Database", label: "Database" },
  { key: "Frameworks", label: "Frameworks" },
  { key: "Libraries", label: "Libraries" },
  { key: "Tools", label: "Tools" },
  { key: "Others", label: "Others" },
];

// ----------------------
// Skeleton Loader
// ----------------------
function SkillsSkeleton({ count = 12 }) {
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-5 sm:gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"
        />
      ))}
    </div>
  );
}

// ----------------------
// Main Component
// ----------------------
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
      if (activeCategory !== "all") url += `&category=${encodeURIComponent(activeCategory)}`; // encode here
      const res = await axios.get(url);
      setSkills(res.data || []);
    } catch (err) {
      console.error("Error fetching skills:", err);
      setSkills([]); // ensure skills is empty array on error
    } finally {
      setLoading(false);
    }
  };
  fetchSkills();
}, [activeCategory, sortBy]);

  return (
    <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-10">
        {/* Skills Heading */}
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Skills
        </motion.h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                activeCategory === cat.key
                  ? "bg-indigo-600 text-white shadow-md scale-105"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-600"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skill Badges */}
        {loading ? (
          <SkillsSkeleton />
        ) : skills.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-10">
            🚧 No skills available yet.
          </p>
        ) : (
          <div className="mt-4 flex flex-wrap justify-center gap-5 sm:gap-6">
            {skills.map((skill, idx) => (
              <motion.div
                key={skill._id}
                className="flex items-center justify-center p-4 rounded-full cursor-pointer
                  bg-gradient-to-tr from-gray-200 via-gray-300 to-gray-200
                  dark:from-gray-700 dark:via-gray-800 dark:to-gray-700
                  shadow-sm dark:shadow-md"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: idx * 0.05,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{
                  scale: 1.15,
                  boxShadow:
                    "0 6px 15px rgba(99,102,241,0.2), 0 6px 25px rgba(139,92,246,0.25)",
                }}
              >
                {skill.logo && (
                  <motion.img
                    src={skill.logo}
                    alt={skill.name}
                    className="w-12 h-12 sm:w-14 sm:h-14"
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
