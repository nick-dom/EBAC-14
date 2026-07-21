import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Gamepad2, Sparkles } from "lucide-react";

const links = [
  { to: "/", label: "Início" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/sobre", label: "Sobre" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `relative font-display text-sm tracking-wide uppercase transition-colors ${
      isActive ? "text-cyan" : "text-muted hover:text-ink"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-void/80 backdrop-blur-lg">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-violet/60 bg-violet/10">
            <Gamepad2 className="h-5 w-5 text-violet-soft" strokeWidth={2} />
            <Sparkles className="absolute -right-1 -top-1 h-3.5 w-3.5 text-cyan" strokeWidth={2.5} />
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-ink">
            NEXUS<span className="text-gradient">VERSE</span>
          </span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <NavLink
          to="/catalogo"
          className="btn-neon hidden items-center rounded-md px-5 py-2.5 text-xs font-bold text-ink md:inline-flex"
        >
          Explorar Jogos
        </NavLink>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-ink md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="flex flex-col gap-1 border-t border-white/5 bg-surface px-5 pb-6 pt-2 md:hidden">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `border-b border-white/5 py-3 font-display text-sm uppercase tracking-wide ${
                  isActive ? "text-cyan" : "text-muted"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/catalogo"
            onClick={() => setOpen(false)}
            className="btn-neon mt-4 inline-flex items-center justify-center rounded-md px-5 py-3 text-xs font-bold text-ink"
          >
            Explorar Jogos
          </NavLink>
        </nav>
      )}
    </header>
  );
}
