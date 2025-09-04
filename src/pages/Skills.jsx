import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const categories = [
  { key: "all", label: "All" },
  { key: "web-dev", label: "Web Dev" },
  { key: "database", label: "Database" },
  { key: "frameworks", label: "Frameworks" },
  { key: "libraries", label: "Libraries" },
  { key: "tools", label: "Tools" },
  { key: "others", label: "Others" },
];

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  // eslint-disable-next-line no-unused-vars
  const [sortBy, setSortBy] = useState("priority");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        let url = `/api/skills?sortBy=${sortBy}&order=desc`;
        if (activeCategory !== "all") url += `&category=${activeCategory}`;
        const res = await axios.get(url);
        setSkills(res.data || []);
      } catch (err) {
        console.error("Error fetching skills:", err);
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
              transition={{ delay: idx * 0.05, type: "spring", stiffness: 200 }}
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
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
