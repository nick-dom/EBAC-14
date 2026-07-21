import { NavLink } from "react-router-dom";
import { Gamepad2, Globe, MessageCircle, Radio } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-void-soft">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-violet/60 bg-violet/10">
                <Gamepad2 className="h-4 w-4 text-violet-soft" />
              </span>
              <span className="font-display text-lg font-bold text-ink">
                NEXUS<span className="text-gradient">VERSE</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Um portal para jogos indie extraordinários. Descubra mundos criados por estúdios
              independentes de todos os cantos do multiverso.
            </p>
            <div className="mt-5 flex gap-3">
              {[Globe, MessageCircle, Radio].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-muted transition-colors hover:border-cyan/50 hover:text-cyan"
                  aria-label="Rede social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navegação */}
          <div>
            <p className="font-display text-xs uppercase tracking-widest text-cyan">Navegação</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li><NavLink to="/" className="hover:text-ink transition-colors">Início</NavLink></li>
              <li><NavLink to="/catalogo" className="hover:text-ink transition-colors">Catálogo</NavLink></li>
              <li><NavLink to="/sobre" className="hover:text-ink transition-colors">Sobre</NavLink></li>
            </ul>
          </div>

          {/* Suporte fictício */}
          <div>
            <p className="font-display text-xs uppercase tracking-widest text-cyan">Portal</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li>contato@nexusverse.dev</li>
              <li>Central de estúdios indie</li>
              <li>Projeto de estudo — React + Vite</li>
            </ul>
          </div>
        </div>

        <div className="divider-glow my-10" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted-2 sm:flex-row">
          <p>Nexus Verse — projeto fictício desenvolvido para fins de estudo com React, Vite &amp; Tailwind CSS.</p>
          <p className="font-mono">All rights reserved with huskyn</p>
        </div>
      </div>
    </footer>
  );
}
