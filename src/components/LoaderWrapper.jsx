import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "./Loader";

/**
 * LoaderWrapper ensures the global loader always animates, 
 * even if the page is fast-loading.
 * 
 * Props:
 * - loading: boolean (true when page is loading)
 * - minTime: minimum time in ms the loader stays visible (default 500ms)
 */
export default function LoaderWrapper({ loading, minTime = 800 }) {
  const [showLoader, setShowLoader] = useState(loading);
  const [timerDone, setTimerDone] = useState(false);

  useEffect(() => {
    if (loading) {
      setShowLoader(true);
      setTimerDone(false);

      const timer = setTimeout(() => {
        setTimerDone(true);
      }, minTime);

      return () => clearTimeout(timer);
    } else {
      // wait for minimum time before hiding
      if (!timerDone) return;
      setShowLoader(false);
    }
  }, [loading, minTime, timerDone]);

  return (
    <AnimatePresence mode="wait">
      {showLoader && (
        <motion.div
          key="global-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999]"
        >
          <Loader />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
