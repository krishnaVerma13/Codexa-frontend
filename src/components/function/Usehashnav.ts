import { useNavigate, useLocation } from "react-router-dom";

/**
 * useHashNav
 *
 * Returns a navigate fn that handles two cases:
 *   1. Already on target page  → smooth scroll to #id immediately
 *   2. On different page       → navigate to path, then scroll after load
 *
 * Usage:
 *   const go = useHashNav();
 *   go("/", "features");   // scrolls to #features on home page
 *   go("/about");          // plain navigation, no scroll
 */
export function useHashNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return function go(path: string, hash?: string) {
    const samePage = location.pathname === path;

    if (hash && samePage) {
      // already on page — just scroll
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (hash) {
      // navigate then scroll once DOM is ready
      navigate(path);
      // rAF gives router time to render before we try to find the element
      const tryScroll = (attempts = 0) => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else if (attempts < 10) {
          setTimeout(() => tryScroll(attempts + 1), 100);
        }
      };
      setTimeout(() => tryScroll(), 50);
      return;
    }

    navigate(path);
  };
}