import { NavLink } from "react-router-dom";
import { Rocket, Compass, Users, Library } from "lucide-react";

const stats = [
  { icon: Library, label: "jogos no catálogo", value: "120+" },
  { icon: Users, label: "estúdios indie", value: "45+" },
  { icon: Rocket, label: "lançamentos por mês", value: "8" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/5">
      {/* Imagem de fundo com overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1754851539824-5a87c5c7cb86?auto=format&fit=crop&w=1800&q=80"
          alt=""
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/40 via-void to-void" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-20 sm:px-8 sm:pb-32 sm:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge inline-flex items-center gap-2 rounded-full border border-violet/40 bg-violet/10 px-4 py-1.5 text-[11px] font-bold text-violet-soft">
            <Compass className="h-3.5 w-3.5" />
            Portal oficial de jogos independentes
          </span>

          <h1 className="mt-6 font-display text-4xl font-black leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            Entre no <span className="text-gradient">Nexus Verse</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Um portal onde mundos indie colidem. Descubra jogos criados por estúdios
            independentes de todo o multiverso — cyberpunk, fantasia, terror, ficção
            científica e tudo o que ainda não tem nome.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <NavLink
              to="/catalogo"
              className="btn-neon inline-flex w-full items-center justify-center gap-2 rounded-md px-8 py-3.5 text-sm font-bold text-ink sm:w-auto"
            >
              <Rocket className="h-4 w-4" />
              Explorar catálogo
            </NavLink>
            <NavLink
              to="/sobre"
              className="btn-outline-neon inline-flex w-full items-center justify-center rounded-md px-8 py-3.5 text-sm font-bold sm:w-auto"
            >
              Conhecer o projeto
            </NavLink>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="mx-auto mt-20 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="glass-card flex flex-col items-center gap-2 rounded-xl px-6 py-7 text-center">
              <Icon className="h-6 w-6 text-cyan" strokeWidth={1.8} />
              <span className="font-display text-2xl font-bold text-ink">{value}</span>
              <span className="text-xs uppercase tracking-wide text-muted">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
