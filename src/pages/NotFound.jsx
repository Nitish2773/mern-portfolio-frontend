// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
      <h1 className="text-7xl font-bold text-gray-800 dark:text-gray-100">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Oops! Page not found
      </h2>
      <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block rounded-2xl bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700 transition"
      >
        ⬅ Back to Home
      </Link>
    </div>
  );
}
