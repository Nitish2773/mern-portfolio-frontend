/* eslint-disable jsx-a11y/heading-has-content */
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";

// Skeleton Loader
function CertificationSkeleton({ count = 6 }) {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white animate-pulse bg-gray-300 h-8 w-48 mx-auto rounded"/>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: count }).map((_, idx) => (
            <div
              key={idx}
              className="relative rounded-xl shadow-xl overflow-hidden group bg-white dark:bg-gray-800 flex flex-col animate-pulse"
              style={{ height: "250px" }}
            >
              <div className="flex-1 w-full bg-gray-300 dark:bg-gray-700"></div>
              <div className="h-10 bg-gray-300 dark:bg-gray-700 m-4 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main Component
export default function Certification() {
  const [certs, setCerts] = useState([]);
  const [filteredCerts, setFilteredCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All", "NxtWave", "HackerRank", "Google", "Microsoft",
    "Meta", "Coursera Badges", "AWS", "MongoDB University",
    "Oracle SQL", "Other",
  ];

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get(`${process.env.REACT_APP_API_BASE}/api/certifications`);
        const sorted = res.data.sort(
          (a, b) =>
            (b.priority ?? 0) - (a.priority ?? 0) ||
            new Date(b.issueDate) - new Date(a.issueDate)
        );
        setCerts(sorted);
        setFilteredCerts(sorted);
      } catch (err) {
        console.error("Error fetching certifications:", err);
        setError("Failed to load certifications. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCerts();
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredCerts(certs);
    } else {
      setFilteredCerts(certs.filter((c) => c.category === selectedCategory));
    }
    setShowAll(false);
  }, [selectedCategory, certs]);

  // Show skeleton while loading
  if (loading) return <CertificationSkeleton />;

  if (error)
    return <p className="text-center py-10 text-red-500 dark:text-red-400">{error}</p>;

  if (!certs.length)
    return <p className="text-center py-10 text-gray-500 dark:text-gray-400">🚧 No certifications added yet.</p>;

  const visibleCerts = showAll ? filteredCerts : filteredCerts.slice(0, 6);

  return (
    <section id="certifications" className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Certifications
        </h2>

        {/* Category Filter */}
        <div className="flex justify-center mb-6">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded px-3 py-2 text-sm sm:text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {visibleCerts.map((cert, idx) => {
            const issueDate = cert.issueDate ? new Date(cert.issueDate).toLocaleDateString() : "—";
            const expiryDate = cert.expiryDate ? new Date(cert.expiryDate).toLocaleDateString() : null;

            return (
              <motion.div
                key={cert._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative rounded-xl shadow-lg overflow-hidden group bg-white dark:bg-gray-800 flex flex-col"
              >
                <div className="relative w-full flex-1 overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center transition duration-300 group-hover:bg-black/20">
                    <div className="opacity-0 group-hover:opacity-100 transition duration-300 bg-white/30 dark:bg-gray-900/40 backdrop-blur-sm px-3 py-2 rounded text-center max-w-[90%]">
                      <h3 className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white">{cert.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 mt-1">
                        {cert.provider}
                        {cert.category && (
                          <span className="ml-1 text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-indigo-600/80 text-white">
                            {cert.category}
                          </span>
                        )}
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-900 dark:text-white mt-1 flex items-center justify-center gap-1">
                        <FaCalendarAlt /> Issued: {issueDate} {expiryDate && `| Expires: ${expiryDate}`}
                      </p>
                    </div>
                  </div>
                </div>

                {cert.verifyUrl && (
                  <div className="flex justify-center p-3 sm:p-4">
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:from-purple-500 hover:to-indigo-500 transition-transform transform hover:-translate-y-1 hover:scale-105 text-sm sm:text-base"
                    >
                      Verify Certificate <FaArrowRight />
                    </a>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* View More Button */}
        {filteredCerts.length > 6 && (
          <div className="text-center mt-8 sm:mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-5 sm:px-6 py-2 sm:py-3 text-indigo-600 dark:text-indigo-400 border border-indigo-400 dark:border-indigo-600 rounded-full font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-800 transition text-sm sm:text-base"
            >
              {showAll ? "View Less" : "View More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
