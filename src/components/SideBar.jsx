// frontend/src/components/Sidebar.jsx
import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaFacebookF,
  FaTelegramPlane,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Sidebar() {
  const icons = [
    { name: "github", icon: FaGithub, url: "https://github.com/Nitish2773" },
    {
      name: "linkedin",
      icon: FaLinkedin,
      url: "https://www.linkedin.com/in/sri-nitish-kamisetti/",
    },
    {
      name: "twitter",
      icon: FaTwitter,
      url: "https://twitter.com/srinitish27",
    },
    {
      name: "facebook",
      icon: FaFacebookF,
      url: "https://www.facebook.com/nitish.k.530435?mibextid=ZbWKwL",
    },
    { name: "telegram", icon: FaTelegramPlane, url: "https://t.me/Srinitish" },
    {
      name: "email",
      icon: FaEnvelope,
      url: "mailto:nitishkamisetti123@gmail.com",
    },
  ];

  return (
    <>
      {/* Desktop vertical sidebar at bottom-left */}
      <aside className="hidden md:flex fixed left-4 bottom-24 flex-col items-center gap-3 z-50">
        {icons.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-sriBlue-500 text-white hover:bg-sriBlue-600 shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 120 }}
              whileHover={{ scale: 1.15, rotate: 10 }}
            >
              <Icon size={18} />
            </motion.a>
          );
        })}

        {/* Optional vertical line above icons */}
        <motion.div
          className="w-[2px] h-24 bg-gray-400 dark:bg-gray-600 mt-3"
          initial={{ height: 0 }}
          animate={{ height: 96 }}
          transition={{ duration: 1 }}
        />
      </aside>

      {/* Mobile bottom-left bar */}
      <aside className="flex md:hidden fixed bottom-4 left-4 gap-3 z-50 bg-white dark:bg-gray-800 px-3 py-2 rounded-full shadow-lg">
        {icons.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sriBlue-600 dark:text-sriTeal hover:text-sriBlue-500 dark:hover:text-sriTeal-400 transition text-lg"
            >
              <Icon size={18} />
            </a>
          );
        })}
      </aside>
    </>
  );
}
