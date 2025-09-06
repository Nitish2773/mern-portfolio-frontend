import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaGraduationCap, FaCalendarAlt } from "react-icons/fa";

// Skeleton loader for Education
function EducationSkeleton({ count = 3 }) {
  return (
    <div className="relative">
      <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 w-1 h-full bg-indigo-200 dark:bg-indigo-700 rounded-full"></div>
      {Array.from({ length: count }).map((_, idx) => {
        const isLeft = idx % 2 === 0;
        return (
          <div
            key={idx}
            className={`mb-16 flex w-full ${
              isLeft ? "sm:justify-start" : "sm:justify-end"
            } justify-start animate-pulse`}
          >
            <div className="relative w-full sm:w-[calc(50%-1rem)] bg-gray-200 dark:bg-gray-700 rounded-xl h-40"></div>
          </div>
        );
      })}
    </div>
  );
}

export default function Education() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducation = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE}/api/education`
        );
        setEducation(
          res.data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
        );
      } catch (err) {
        console.error("Error fetching education:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEducation();
  }, []);

  return (
    <section
      id="education"
      className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold mb-16 text-center text-gray-900 dark:text-white">
          Education
        </h2>

        {loading ? (
          <EducationSkeleton count={3} />
        ) : education.length === 0 ? (
          <p className="text-center py-10 text-gray-500 dark:text-gray-400">
            🎓 No education details available.
          </p>
        ) : (
          <div className="relative">
            {/* timeline line */}
            <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 w-1 h-full bg-indigo-200 dark:bg-indigo-700 rounded-full"></div>

            {education.map((edu, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <motion.div
                  key={edu._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`mb-16 flex w-full ${
                    isLeft ? "sm:justify-start" : "sm:justify-end"
                  } justify-start`}
                >
                  <div
                    className={`relative w-full sm:w-[calc(50%-1rem)] bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:scale-[1.02] transition-transform`}
                  >
                    {/* marker */}
                    <span
                      className={`absolute top-6 sm:top-8 w-6 h-6 rounded-full bg-indigo-600 dark:bg-indigo-400 border-4 border-white dark:border-gray-900 
                      ${isLeft ? "-left-9 sm:-right-3" : "-left-9 sm:-left-3"}`}
                    ></span>

                    {/* logo + info */}
                    <div className="flex items-center gap-4">
                      {edu.logo ? (
                        <img
                          src={edu.logo}
                          alt={edu.institution}
                          className="w-12 h-12 object-contain rounded-full border border-indigo-200 dark:border-indigo-600"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="w-12 h-12 flex items-center justify-center bg-indigo-100 dark:bg-indigo-700 rounded-full">
                          <FaGraduationCap className="text-indigo-600 dark:text-indigo-200 text-lg" />
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {edu.institution}
                        </h3>
                        {edu.program && (
                          <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                            {edu.program}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* dates */}
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      <FaCalendarAlt className="text-indigo-500" />
                      {new Date(edu.startDate).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      –{" "}
                      {edu.endDate
                        ? new Date(edu.endDate).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })
                        : "Present"}
                    </p>

                    {/* description */}
                    {edu.description && (
                      <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm">
                        {edu.description}
                      </p>
                    )}

                    {/* skills */}
                    {edu.skills?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {edu.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-indigo-50 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
