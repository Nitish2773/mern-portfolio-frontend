import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaFacebookF, FaTelegramPlane, FaPlus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const icons = [
    { name: "github", icon: FaGithub, url: "https://github.com/Nitish2773" },
    { name: "linkedin", icon: FaLinkedin, url: "https://www.linkedin.com/in/sri-nitish-kamisetti/" },
    { name: "twitter", icon: FaTwitter, url: "https://twitter.com/srinitish27" },
    { name: "facebook", icon: FaFacebookF, url: "https://www.facebook.com/nitish.k.530435?mibextid=ZbWKwL" },
    { name: "telegram", icon: FaTelegramPlane, url: "https://t.me/Srinitish" },
    { name: "email", icon: FaEnvelope, url: "mailto:nitishkamisetti123@gmail.com" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
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

      {/* Mobile Sidebar */}
      <aside className="flex md:hidden fixed bottom-24 left-4 z-50 flex-col items-start gap-2">
        {/* Floating shutter button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 rounded-full bg-sriBlue-500 text-white shadow-lg hover:bg-sriBlue-600 transition"
          animate={{ rotate: isOpen ? 45 : 0 }}
          whileHover={{ scale: 1.1 }}
          transition={{ rotate: { type: "spring", stiffness: 200, damping: 20 } }}
        >
          <FaPlus size={18} />
        </motion.button>

        {/* Vertical sliding panel */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                key="overlay"
                className="fixed inset-0 bg-black/20 dark:bg-black/50 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
              />

              {/* Vertical icons panel */}
              <motion.div
                key="panel"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="fixed bottom-20 left-4 flex flex-col gap-3 bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-xl z-50"
              >
                {icons.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-sriBlue-500 text-white hover:bg-sriBlue-600 shadow-md transition"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: idx * 0.05, type: "spring", stiffness: 200, damping: 20 }}
                    >
                      <Icon size={16} />
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
