import { Code2, Layers, Rocket, Heart } from "lucide-react";
import SectionHeading from "../components/SectionHeading";

const tecnologias = [
  { nome: "React 19", detalhe: "Componentes, props, state e hooks" },
  { nome: "Vite", detalhe: "Build tool ultrarrápida para o front-end" },
  { nome: "React Router", detalhe: "Navegação entre páginas em SPA" },
  { nome: "Tailwind CSS v4", detalhe: "Estilização utilitária e responsiva" },
];

const etapas = [
  {
    icon: Layers,
    titulo: "Componentização",
    texto: "Cada peça da interface — cards, formulário, grid — é um componente reutilizável e independente.",
  },
  {
    icon: Code2,
    titulo: "Estado & efeitos",
    texto: "useState controla os dados do catálogo e do formulário; useEffect simula o carregamento inicial via API.",
  },
  {
    icon: Rocket,
    titulo: "Publicação",
    texto: "O projeto é versionado no GitHub, pronto para ser clonado, instalado com npm e rodado com Vite.",
  },
];

export default function Sobre() {
  return (
    <main>
      <section className="border-b border-white/5 bg-void-soft py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Sobre o projeto"
            title="Nexus Verse é um portal fictício de jogos indie"
            description="Criado como projeto de estudo para praticar componentes reutilizáveis, JSX, props, state, formulários controlados e o ciclo de vida com useEffect em React."
          />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">A ideia por trás do portal</h2>
            <p className="mt-4 leading-relaxed text-muted">
              O Nexus Verse imagina um só lugar onde universos criados por estúdios indie se
              encontram: space operas, cyberpunk neon, terror aquático, RPGs a vapor. Nenhum dos
              jogos listados é real — os nomes, estúdios e descrições foram criados especialmente
              para este catálogo de demonstração.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              O objetivo é técnico: exercitar a construção de uma aplicação React completa, do
              carregamento simulado de dados até o cadastro de novos itens por um formulário
              controlado.
            </p>
          </div>
          <div className="glass-card flex flex-col justify-center gap-4 rounded-xl p-7">
            <div className="flex items-center gap-2 text-magenta">
              <Heart className="h-5 w-5 fill-magenta" />
              <span className="font-display text-sm font-bold uppercase tracking-wide">Feito com</span>
            </div>
            <ul className="space-y-3">
              {tecnologias.map((tech) => (
                <li key={tech.nome} className="flex items-start justify-between gap-4 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <span className="font-display text-sm font-bold text-ink">{tech.nome}</span>
                  <span className="text-right text-xs text-muted">{tech.detalhe}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Etapas do projeto */}
      <section className="border-t border-white/5 bg-void-soft py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="Como foi construído" title="Da simulação de API ao cadastro de jogos" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {etapas.map(({ icon: Icon, titulo, texto }, i) => (
              <div key={titulo} className="glass-card relative rounded-xl p-7">
                <span className="font-mono absolute right-5 top-5 text-3xl font-bold text-white/5">
                  0{i + 1}
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-md border border-cyan/40 bg-cyan/10">
                  <Icon className="h-5 w-5 text-cyan" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-ink">{titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
