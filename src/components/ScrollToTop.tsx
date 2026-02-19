import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // delay slightly to ensure destination DOM has mounted
    setTimeout(() => {
      if (hash) {
        // If there's a hash, scroll to that element (smooth)
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }

      // Prefer scrolling the page's primary heading or an anchored section into view
      // so `scroll-margin-top` (header offset) is respected on the target element.
      const target = document.querySelector('main h1, main section[id], main [id]');
      if (target) {
        (target as HTMLElement).scrollIntoView({ behavior: 'auto', block: 'start' });
        return;
      }

      // If no heading found, ensure the first section is scrolled into view with offset
      const firstSection = document.querySelector('main > section:first-child');
      if (firstSection) {
        (firstSection as HTMLElement).scrollIntoView({ behavior: 'auto', block: 'start' });
        return;
      }

      // Fallback to top of page
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 50);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
