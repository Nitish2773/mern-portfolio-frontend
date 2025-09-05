import React, { useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaFacebookF,
  FaTelegramPlane,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus } from "react-icons/fi"; // cleaner plus icon

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const icons = [
    { name: "github", icon: FaGithub, url: "https://github.com/Nitish2773" },
    {
      name: "linkedin",
      icon: FaLinkedin,
      url: "https://www.linkedin.com/in/sri-nitish-kamisetti/",
    },
    { name: "twitter", icon: FaTwitter, url: "https://twitter.com/srinitish27" },
    { name: "facebook", icon: FaFacebookF, url: "https://www.facebook.com/nitish.k.530435?mibextid=ZbWKwL" },
    { name: "telegram", icon: FaTelegramPlane, url: "https://t.me/Srinitish" },
    { name: "email", icon: FaEnvelope, url: "mailto:nitishkamisetti123@gmail.com" },
  ];

  return (
    <>
      {/* Desktop sidebar remains unchanged */}
      {/* ... */}

      {/* Mobile shutter-style sidebar */}
      <aside className="flex md:hidden fixed bottom-32 left-4 z-50 flex-col items-center gap-4">
        {/* Stylish toggle button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 rounded-full bg-gradient-to-tr from-sriBlue-500 to-sriTeal text-white shadow-2xl border border-white dark:border-gray-800 hover:scale-110 transition-transform"
          whileTap={{ scale: 0.9, rotate: 45 }}
          animate={{
            rotate: isOpen ? 45 : 0,
            scale: [1, 1.05, 1],
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <FiPlus size={24} />
        </motion.button>

        {/* Social icons panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.85 }}
              transition={{ type: "spring", stiffness: 220, damping: 25 }}
              className="flex flex-col gap-4 bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700"
            >
              {icons.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sriBlue-600 dark:text-sriTeal hover:text-sriBlue-500 dark:hover:text-sriTeal-400 transition text-2xl"
                  >
                    <Icon />
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </aside>
    </>
  );
}
