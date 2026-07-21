import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Garante que, ao navegar entre páginas (React Router), a rolagem
 * volte ao topo — comportamento esperado de um site multi-página.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);

  return null;
}
