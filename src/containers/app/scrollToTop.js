import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * When Page is loaded,the scroll will go to the top
 * @returns {null}
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}