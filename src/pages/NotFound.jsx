// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h1 className="text-7xl font-bold text-gray-800 dark:text-gray-100 transition-colors duration-300">
        404
      </h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-300">
        Oops! Page not found
      </h2>
      <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-md transition-colors duration-300">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <Link
        to="/"
        aria-label="Go back to home"
        className="mt-6 inline-block rounded-2xl bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700 transition"
      >
        ⬅ Back to Home
      </Link>
    </motion.div>
  );
}
