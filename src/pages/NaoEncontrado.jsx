import { NavLink } from "react-router-dom";
import { Compass, Home } from "lucide-react";

export default function NaoEncontrado() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-5 py-24 text-center">
      <span className="font-display text-8xl font-black text-gradient">404</span>
      <h1 className="mt-4 font-display text-2xl font-bold text-ink">
        Esta dimensão ainda não foi mapeada
      </h1>
      <p className="mt-3 max-w-md text-muted">
        O portal que você tentou acessar não existe no Nexus Verse. Volte para um caminho conhecido.
      </p>
      <div className="mt-9 flex flex-col gap-4 sm:flex-row">
        <NavLink
          to="/"
          className="btn-neon inline-flex items-center justify-center gap-2 rounded-md px-7 py-3 text-sm font-bold text-ink"
        >
          <Home className="h-4 w-4" />
          Voltar ao início
        </NavLink>
        <NavLink
          to="/catalogo"
          className="btn-outline-neon inline-flex items-center justify-center gap-2 rounded-md px-7 py-3 text-sm font-bold"
        >
          <Compass className="h-4 w-4" />
          Explorar catálogo
        </NavLink>
      </div>
    </main>
  );
}
