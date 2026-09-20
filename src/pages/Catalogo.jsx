import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, LayoutGrid } from "lucide-react";
import GameGrid from "../components/GameGrid";
import GameForm from "../components/GameForm";
import Loading from "../components/Loading";
import SectionHeading from "../components/SectionHeading";
import { jogosMock } from "../data/jogos";

export default function Catalogo() {
  // ---- state que guarda a lista de produtos (jogos) ----
  const [jogos, setJogos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // ---- state dos controles de busca/filtro ----
  const [busca, setBusca] = useState("");
  const [buscaDebounced, setBuscaDebounced] = useState("");
  const [generoFiltro, setGeneroFiltro] = useState("Todos");

  // Debounce: só atualiza o valor usado no filtro 300ms depois da
  // última tecla digitada, evitando recalcular a lista a cada letra
  // (e evitaria uma requisição por letra numa busca real via API).
  useEffect(() => {
    const timer = setTimeout(() => setBuscaDebounced(busca), 300);
    return () => clearTimeout(timer);
  }, [busca]);

  // ---- simulação de chamada de API com useEffect + setTimeout ----
  useEffect(() => {
    setCarregando(true);
    const timer = setTimeout(() => {
      try {
        setJogos(jogosMock);
        setErro(null);
      } catch {
        setErro("Não foi possível carregar o catálogo agora.");
      } finally {
        setCarregando(false);
      }
    }, 1400); // simula latência de rede

    return () => clearTimeout(timer); // limpeza do efeito
  }, []);

  // adiciona um novo jogo cadastrado pelo formulário ao topo da lista
  function handleAdicionarJogo(novoJogo) {
    setJogos((prev) => [novoJogo, ...prev]);
  }

  const generos = useMemo(() => {
    const unicos = new Set(jogos.map((j) => j.genero).filter(Boolean));
    return ["Todos", ...Array.from(unicos)];
  }, [jogos]);

  const jogosFiltrados = useMemo(() => {
    return jogos.filter((jogo) => {
      const combinaBusca = jogo.nome.toLowerCase().includes(buscaDebounced.toLowerCase());
      const combinaGenero = generoFiltro === "Todos" || jogo.genero === generoFiltro;
      return combinaBusca && combinaGenero;
    });
  }, [jogos, buscaDebounced, generoFiltro]);

  return (
    <main>
      {/* Cabeçalho da página */}
      <section className="border-b border-white/5 bg-void-soft py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Catálogo Nexus Verse"
            title="Descubra seu próximo jogo indie favorito"
            description="Filtre por gênero, busque por nome ou cadastre um novo título direto no portal."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        {/* Controles de busca e filtro */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-2" />
            <input
              type="search"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar jogo pelo nome..."
              className="w-full rounded-md border border-white/10 bg-surface py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-muted-2 focus:border-violet focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <SlidersHorizontal className="h-4 w-4 shrink-0 text-muted-2" />
            {generos.map((genero) => (
              <button
                key={genero}
                type="button"
                onClick={() => setGeneroFiltro(genero)}
                className={`badge shrink-0 rounded-full border px-3.5 py-1.5 text-[11px] font-bold transition-colors ${
                  generoFiltro === genero
                    ? "border-violet bg-violet/20 text-violet-soft"
                    : "border-white/10 text-muted hover:border-white/30 hover:text-ink"
                }`}
              >
                {genero}
              </button>
            ))}
          </div>
        </div>

        {/* Contador de resultados */}
        {!carregando && (
          <p className="mb-6 flex items-center gap-2 text-xs uppercase tracking-wide text-muted-2">
            <LayoutGrid className="h-3.5 w-3.5" />
            {jogosFiltrados.length} {jogosFiltrados.length === 1 ? "jogo encontrado" : "jogos encontrados"}
          </p>
        )}

        {/* Estado de carregamento / erro / lista */}
        {carregando ? (
          <>
            <Loading message="Sincronizando com o multiverso..." />
            <GameGrid jogos={[]} carregando />
          </>
        ) : erro ? (
          <div className="glass-card rounded-xl px-6 py-16 text-center text-magenta">{erro}</div>
        ) : (
          <GameGrid jogos={jogosFiltrados} carregando={false} />
        )}
      </section>

      {/* Formulário de cadastro */}
      <section className="border-t border-white/5 bg-void-soft py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Para desenvolvedores"
            title="Cadastre seu jogo no portal"
            description="Preencha os dados abaixo para adicionar um novo título ao catálogo do Nexus Verse."
          />
          <GameForm onAdicionar={handleAdicionarJogo} />
        </div>
      </section>
    </main>
  );
}
