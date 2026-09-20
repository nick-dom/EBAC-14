import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Loading from "./components/Loading";
import Home from "./pages/Home";

// Code splitting por rota: Home vem no bundle inicial (é a landing page),
// as demais páginas só são baixadas quando o usuário navega até elas.
const Catalogo = lazy(() => import("./pages/Catalogo"));
const Sobre = lazy(() => import("./pages/Sobre"));
const NaoEncontrado = lazy(() => import("./pages/NaoEncontrado"));

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<Loading message="Carregando página..." />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="*" element={<NaoEncontrado />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}
