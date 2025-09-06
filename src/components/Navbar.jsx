import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/education", label: "Education" },
  { to: "/projects", label: "Projects" },
  { to: "/skills", label: "Skills" },
  { to: "/certifications", label: "Certifications" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const mobileLinkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, type: "spring", stiffness: 120 },
    }),
  };

  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur-md bg-white/50 dark:bg-gray-900/90 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center 
              bg-gradient-to-br from-sriBlue-500 to-sriBlue-700 text-white font-extrabold text-lg shadow-md"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            SN
          </motion.div>
          <div className="hidden sm:flex flex-col">
            <div className="text-lg sm:text-xl font-bold tracking-wide bg-clip-text text-transparent 
              bg-gradient-to-r from-sriBlue-600 to-sriBlue-700"
            >
              SRI NITISH
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Aspiring IT Specialist & Data Engineer
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative font-medium text-sm sm:text-base transition-all ${
                  isActive
                    ? "text-sriBlue-600"
                    : "text-gray-700 hover:text-sriBlue-600"
                }`
              }
            >
              {item.label}
              <motion.span
                className="absolute left-0 -bottom-1 h-[2px] w-full rounded-full bg-gradient-to-r from-sriBlue-600 to-sriBlue-700 scale-x-0 origin-left"
                whileHover={{ scaleX: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
              />
            </NavLink>
          ))}
        </nav>

        {/* Right side: Theme + Mobile Menu */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="md:hidden p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <nav className="flex flex-col px-4 sm:px-6 py-2 space-y-2">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.to}
                  custom={idx}
                  variants={mobileLinkVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded-lg text-base sm:text-lg font-medium transition ${
                        isActive
                          ? "bg-sriBlue-600 text-white"
                          : "text-gray-700 hover:bg-sriBlue-100"
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
