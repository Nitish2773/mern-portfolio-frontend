// frontend/src/components/Sidebar.jsx
import React, { useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaFacebookF,
  FaTelegramPlane,
  FaPlus,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

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
      {/* Desktop sidebar */}
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

        <motion.div
          className="w-[2px] h-24 bg-gray-400 dark:bg-gray-600 mt-3"
          initial={{ height: 0 }}
          animate={{ height: 96 }}
          transition={{ duration: 1 }}
        />
      </aside>

      {/* Mobile shutter-style sidebar */}
      <aside className="flex md:hidden fixed bottom-32 left-4 z-50 flex-col items-center gap-2">
        {/* Floating shutter button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 rounded-full bg-sriBlue-500 text-white shadow-lg hover:bg-sriBlue-600 transition"
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 0 : [0, -3, 0],
          }}
          whileHover={{ scale: 1.1 }}
          transition={{
            rotate: { type: "spring", stiffness: 200, damping: 20 },
            y: isOpen
              ? { duration: 0 }
              : { repeat: Infinity, repeatType: "loop", duration: 2, ease: "easeInOut", delay: 0.5 },
          }}
        >
          <FaPlus size={20} />
        </motion.button>

        {/* Overlay + Panel */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop overlay */}
              <motion.div
                key="overlay"
                className="fixed inset-0 bg-black/20 dark:bg-black/50 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
              />

              {/* Social icons panel */}
              <motion.div
                key="panel"
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 250, damping: 25 }}
                className="fixed bottom-40 left-4 flex flex-col gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl z-50"
              >
                {icons.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sriBlue-600 dark:text-sriTeal hover:text-sriBlue-500 dark:hover:text-sriTeal-400 transition"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: idx * 0.08, type: "spring", stiffness: 200, damping: 20 }}
                    >
                      <Icon size={20} />
                    </motion.a>
                  );
                })}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </aside>
    </>
  );
}
