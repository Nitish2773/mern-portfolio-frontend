import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaBriefcase, FaCalendarAlt, FaCertificate } from "react-icons/fa";

// Skeleton loader for Experience
function ExperienceSkeleton({ count = 4 }) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="relative rounded-xl bg-gray-200 dark:bg-gray-700 p-5 sm:p-6 animate-pulse h-56 sm:h-60"
        ></div>
      ))}
    </div>
  );
}

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE}/api/experience`);
        setExperiences(
          res.data.sort((a, b) => {
            if (!a.endDate && b.endDate) return -1;
            if (a.endDate && !b.endDate) return 1;
            if (!a.endDate && !b.endDate) return new Date(b.startDate) - new Date(a.startDate);
            return new Date(b.endDate) - new Date(a.endDate);
          })
        );
      } catch (err) {
        console.error("Error fetching experiences:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  return (
    <section
      id="experience"
      className="py-12 sm:py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-10 sm:mb-12 text-center text-gray-900 dark:text-white">
          Experience
        </h2>

        {loading ? (
          <ExperienceSkeleton count={4} />
        ) : experiences.length === 0 ? (
          <p className="text-center py-10 text-gray-500 dark:text-gray-400">
            No experiences available.
          </p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative rounded-xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1"
              >
                {/* Accent bar */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-500 rounded-t-xl"></div>

                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    {exp.logo ? (
                      <img
                        src={exp.logo}
                        alt={exp.company}
                        className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded-lg border border-gray-200 dark:border-gray-700"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-indigo-100 dark:bg-indigo-700 rounded-lg">
                        <FaBriefcase className="text-indigo-600 dark:text-indigo-200 text-lg sm:text-xl" />
                      </div>
                    )}

                    <div className="flex-1">
                      <h3 className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white">
                        {exp.role}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        {exp.company}{" "}
                        {exp.location && (
                          <span className="text-gray-400">• {exp.location}</span>
                        )}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 sm:gap-2 mt-1">
                        <FaCalendarAlt className="text-indigo-500" />
                        {new Date(exp.startDate).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        –{" "}
                        {exp.endDate
                          ? new Date(exp.endDate).toLocaleDateString("en-US", {
                              month: "short",
                              year: "numeric",
                            })
                          : "Present"}
                      </p>
                    </div>
                  </div>

                  {exp.description && (
                    <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  )}

                  {exp.responsibilities?.length > 0 && (
                    <ul className="mt-2 sm:mt-3 list-disc list-inside text-gray-700 dark:text-gray-300 text-xs sm:text-sm space-y-1">
                      {exp.responsibilities.map((task, idx) => (
                        <li key={idx}>{task}</li>
                      ))}
                    </ul>
                  )}

                  {exp.skills?.length > 0 && (
                    <div className="mt-2 sm:mt-4 flex flex-wrap gap-1 sm:gap-2">
                      {exp.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 sm:px-3 py-1 text-[9px] sm:text-xs bg-indigo-100 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-200 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {exp.certificateUrl && (
                    <div className="mt-2 sm:mt-4">
                      <a
                        href={exp.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 rounded hover:underline transition-colors duration-200"
                      >
                        <FaCertificate className="text-indigo-500 dark:text-indigo-300 text-xs sm:text-sm" />
                        View Certificate
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
