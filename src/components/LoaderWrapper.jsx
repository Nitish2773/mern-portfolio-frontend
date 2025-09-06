// src/components/LoaderWrapper.jsx
import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { useLocation, useNavigationType } from "react-router-dom";

export default function LoaderWrapper({ children }) {
  const location = useLocation();
  const navType = useNavigationType();

  const [showLoader, setShowLoader] = useState(true);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);

  // Minimum loader display time (1s)
  useEffect(() => {
    const timer = setTimeout(() => setMinTimeElapsed(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Show loader on route change
  useEffect(() => {
    setShowLoader(true);
    setContentLoaded(false);
    setMinTimeElapsed(false);

    const timer = setTimeout(() => setMinTimeElapsed(true), 1000);
    return () => clearTimeout(timer);
  }, [location.pathname, navType]);

  // Hide loader when both minTimeElapsed & contentLoaded are true
  useEffect(() => {
    if (minTimeElapsed && contentLoaded) {
      setShowLoader(false);
    }
  }, [minTimeElapsed, contentLoaded]);

  return (
    <>
      {showLoader && <Loader />}
      {React.cloneElement(children, { setContentLoaded })}
    </>
  );
}
