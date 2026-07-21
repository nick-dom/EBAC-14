import GameCard from "./GameCard";
import { GameCardSkeleton } from "./Loading";
import { SearchX } from "lucide-react";

/**
 * GameGrid — recebe a lista de jogos (state) via props e a renderiza
 * dinamicamente com .map(), repassando cada item como props para o
 * GameCard reutilizável.
 */
export default function GameGrid({ jogos, carregando }) {
  if (carregando) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <GameCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!jogos || jogos.length === 0) {
    return (
      <div className="glass-card flex flex-col items-center gap-3 rounded-xl px-6 py-20 text-center">
        <SearchX className="h-10 w-10 text-muted-2" />
        <p className="font-display text-lg text-ink">Nenhum jogo encontrado</p>
        <p className="max-w-sm text-sm text-muted">
          Tente ajustar sua busca ou os filtros de gênero para encontrar o jogo perfeito.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {jogos.map((jogo) => (
        <GameCard
          key={jogo.id}
          nome={jogo.nome}
          preco={jogo.preco}
          imagem={jogo.imagem}
          descricao={jogo.descricao}
          genero={jogo.genero}
          avaliacao={jogo.avaliacao}
          estudio={jogo.estudio}
          novo={jogo.novo}
        />
      ))}
    </div>
  );
}
