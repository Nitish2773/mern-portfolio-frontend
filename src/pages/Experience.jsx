import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaBriefcase, FaCalendarAlt, FaCertificate } from "react-icons/fa";

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await axios.get("/api/experience");

        setExperiences(
          res.data.sort((a, b) => {
            if (!a.endDate && b.endDate) return -1;
            if (a.endDate && !b.endDate) return 1;
            if (!a.endDate && !b.endDate)
              return new Date(b.startDate) - new Date(a.startDate);
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

  if (loading)
    return (
      <p className="text-center py-10 text-gray-500 dark:text-gray-400">
        Loading experiences...
      </p>
    );

  if (!experiences.length)
    return (
      <p className="text-center py-10 text-gray-500 dark:text-gray-400">
        No experiences available.
      </p>
    );

  return (
    <section
      id="experience"
      className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold mb-12 text-center text-gray-900 dark:text-white">
          Experience
        </h2>

        <div className="grid gap-8 sm:grid-cols-2">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative rounded-xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1"
            >
              {/* Accent bar */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-500 rounded-t-xl"></div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  {exp.logo ? (
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      className="w-14 h-14 object-contain rounded-lg border border-gray-200 dark:border-gray-700"
                    />
                  ) : (
                    <div className="w-14 h-14 flex items-center justify-center bg-indigo-100 dark:bg-indigo-700 rounded-lg">
                      <FaBriefcase className="text-indigo-600 dark:text-indigo-200 text-xl" />
                    </div>
                  )}

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {exp.role}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {exp.company}{" "}
                      {exp.location && (
                        <span className="text-gray-400">• {exp.location}</span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
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
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                )}

                {exp.responsibilities?.length > 0 && (
                  <ul className="mt-3 list-disc list-inside text-gray-700 dark:text-gray-300 text-sm space-y-1">
                    {exp.responsibilities.map((task, idx) => (
                      <li key={idx}>{task}</li>
                    ))}
                  </ul>
                )}

                {exp.skills?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs bg-indigo-100 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-200 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {exp.certificateUrl && (
                  <div className="mt-4">
                    <a
                      href={exp.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 rounded hover:underline transition-colors duration-200"
                    >
                      <FaCertificate className="text-indigo-500 dark:text-indigo-300 text-sm" />
                      View Certificate
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
