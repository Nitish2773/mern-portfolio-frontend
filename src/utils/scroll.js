// frontend/src/utils/scroll.js

/**
 * Smoothly scrolls to a section by ID.
 * @param {string} id - The ID of the target element.
 */
export const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

/**
 * Instantly scrolls to the top of the page.
 */
export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
