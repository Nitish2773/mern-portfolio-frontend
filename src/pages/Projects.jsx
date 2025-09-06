// frontend/src/pages/Projects.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaFileAlt, FaSearch } from "react-icons/fa";

// Expanded category list
const categoryOptions = [
  "all",
  "MERN",
  "Data Engineer",
  "Data Analytics",
  "React",
  "Python",
  "Java",
  "Artificial Intelligence",
  "Machine Learning",
  "AWS",
  "SQL",
  "IT Support Projects",
];

// ----------------------
// Skeleton Loader
// ----------------------
function ProjectsSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="relative flex flex-col p-6 rounded-3xl shadow-xl bg-gray-200 dark:bg-gray-800 animate-pulse"
          style={{ height: "400px" }}
        />
      ))}
    </div>
  );
}

// ----------------------
// Main Component
// ----------------------
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);

  const [sortBy, setSortBy] = useState("startDate");
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE}/api/projects`
        );
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const loadMore = () => setVisibleCount((prev) => prev + 6);

  if (loading) return <ProjectsSkeleton />;

  if (!projects.length)
    return (
      <p className="text-center py-10 text-gray-500 dark:text-gray-400">
        🚧 No projects available yet.
      </p>
    );

  // 🔹 Filtering
  let filteredProjects =
    filterCategory === "all"
      ? [...projects]
      : projects.filter((p) => p.category === filterCategory);

  // 🔹 Search
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredProjects = filteredProjects.filter(
      (p) =>
        p.title?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.techStack?.join?.(",")?.toLowerCase().includes(query)
    );
  }

  // 🔹 Sorting
  filteredProjects.sort((a, b) => {
    if (sortBy === "startDate")
      return new Date(b.startDate || 0) - new Date(a.startDate || 0);
    if (sortBy === "endDate")
      return new Date(b.endDate || 0) - new Date(a.endDate || 0);
    return 0;
  });

  return (
    <section
      id="projects"
      className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          Projects
        </h2>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          >
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          >
            <option value="startDate">Sort by Start Date</option>
            <option value="endDate">Sort by End Date</option>
          </select>

          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 pl-10 border rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            />
            <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.slice(0, visibleCount).map((project, idx) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative flex flex-col p-6 rounded-3xl shadow-xl bg-gradient-to-tr from-white/80 dark:from-gray-800/80 via-white/50 dark:via-gray-700/50 to-white/70 dark:to-gray-600/70 backdrop-blur-md hover:scale-105 hover:shadow-2xl transition-transform duration-300"
            >
              {project.thumbnail && (
                <div className="w-full h-48 flex items-center justify-center overflow-hidden rounded-xl mb-4 bg-gray-200 dark:bg-gray-700">
                  <img
                    src={project.thumbnail}
                    alt={project.title || "Project thumbnail"}
                    loading="lazy"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}
              {project.title && (
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
              )}
              {project.description && (
                <p className="text-gray-700 dark:text-gray-300 flex-1 mb-3">
                  {project.description}
                </p>
              )}
              {project.techStack && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {(Array.isArray(project.techStack)
                    ? project.techStack
                    : project.techStack.split(",")
                  )
                    .map((tech) => tech.trim())
                    .filter(Boolean)
                    .map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-sm rounded-full bg-gradient-to-r from-sriBlue-400 to-sriTeal-400 text-gray-900 dark:text-white shadow-md hover:shadow-lg transition"
                      >
                        {tech}
                      </span>
                    ))}
                </div>
              )}
              {(project.liveUrl ||
                project.githubUrl ||
                project.caseStudyUrl) && (
                <div className="mt-auto flex flex-wrap gap-4 text-indigo-600 dark:text-indigo-400 font-medium">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-sriBlue-500 transition"
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-sriBlue-500 transition"
                    >
                      <FaGithub /> GitHub
                    </a>
                  )}
                  {project.caseStudyUrl && (
                    <a
                      href={project.caseStudyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-sriBlue-500 transition"
                    >
                      <FaFileAlt /> Case Study
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* View More */}
        {visibleCount < filteredProjects.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={loadMore}
              className="flex items-center gap-3 px-6 py-3 bg-sriBlue-500 text-white rounded-full shadow-lg hover:bg-sriBlue-600 transition transform hover:-translate-y-1 hover:scale-105"
            >
              View More Projects
              <span className="text-2xl motion-safe:animate-bounce">↓</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
