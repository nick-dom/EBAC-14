import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import Sobre from "./pages/Sobre";
import NaoEncontrado from "./pages/NaoEncontrado";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="*" element={<NaoEncontrado />} />
      </Routes>
      <Footer />
    </div>
  );
}
