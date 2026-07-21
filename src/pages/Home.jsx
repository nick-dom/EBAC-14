import { NavLink } from "react-router-dom";
import { ArrowRight, Zap, ShieldCheck, Puzzle } from "lucide-react";
import Hero from "../components/Hero";
import SectionHeading from "../components/SectionHeading";
import GameCard from "../components/GameCard";
import { jogosMock } from "../data/jogos";

const destaques = jogosMock.slice(0, 3);

const pilares = [
  {
    icon: Zap,
    titulo: "Curadoria viva",
    texto: "Cada jogo listado passa por uma curadoria feita por jogadores e devs, não por algoritmos frios.",
  },
  {
    icon: ShieldCheck,
    titulo: "Estúdios verificados",
    texto: "Perfis de estúdios independentes verificados, com transparência sobre quem está por trás de cada título.",
  },
  {
    icon: Puzzle,
    titulo: "Descoberta por gênero",
    texto: "De metroidvanias a horror cósmico: encontre exatamente o tipo de experiência que você procura.",
  },
];

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Destaques */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          eyebrow="Em destaque"
          title="Jogos que estão movendo o multiverso"
          description="Uma seleção dos títulos mais bem avaliados pela comunidade Nexus Verse nesta temporada."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destaques.map((jogo) => (
            <GameCard
              key={jogo.id}
              nome={jogo.nome}
              preco={jogo.preco}
              imagem={jogo.imagem}
              descricao={jogo.descricao}
              genero={jogo.genero}
              avaliacao={jogo.avaliacao}
              estudio={jogo.estudio}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <NavLink
            to="/catalogo"
            className="btn-outline-neon inline-flex items-center gap-2 rounded-md px-7 py-3 text-sm font-bold"
          >
            Ver catálogo completo
            <ArrowRight className="h-4 w-4" />
          </NavLink>
        </div>
      </section>

      {/* Pilares / diferenciais */}
      <section className="border-y border-white/5 bg-void-soft py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Por que o Nexus Verse"
            title="Feito por quem joga, para quem cria"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {pilares.map(({ icon: Icon, titulo, texto }) => (
              <div key={titulo} className="glass-card rounded-xl p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-md border border-violet/50 bg-violet/10">
                  <Icon className="h-5 w-5 text-violet-soft" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-ink">{titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 sm:py-28">
        <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
          Pronto para entrar no <span className="text-gradient">Nexus Verse</span>?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-muted">
          Explore o catálogo completo, cadastre seu próprio jogo e faça parte do portal indie
          mais vivo do multiverso.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <NavLink
            to="/catalogo"
            className="btn-neon inline-flex w-full items-center justify-center gap-2 rounded-md px-8 py-3.5 text-sm font-bold text-ink sm:w-auto"
          >
            Explorar catálogo
          </NavLink>
          <NavLink
            to="/sobre"
            className="btn-outline-neon inline-flex w-full items-center justify-center rounded-md px-8 py-3.5 text-sm font-bold sm:w-auto"
          >
            Sobre o projeto
          </NavLink>
        </div>
      </section>
    </main>
  );
}
