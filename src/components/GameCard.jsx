import { memo } from "react";
import { Star, Tag } from "lucide-react";

/**
 * GameCard — equivalente ao "ProdutoCard" pedido no exercício.
 * Recebe as informações do produto (jogo) via props: nome, preco,
 * imagem e descricao são obrigatórios; genero, avaliacao e estudio
 * são opcionais e usados apenas para enriquecer o visual quando existem.
 */
function GameCard({
  nome,
  preco,
  imagem,
  descricao,
  genero,
  avaliacao,
  estudio,
  novo = false,
}) {
  const precoFormatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(preco);

  // Gera variantes menores da mesma imagem (a Unsplash aceita &w= dinâmico)
  // pra o navegador escolher o tamanho certo em vez de sempre baixar 800px.
  const baseUrl = imagem.split("&w=")[0];
  const srcSet = [400, 600, 800]
    .map((w) => `${baseUrl}&w=${w}&q=80 ${w}w`)
    .join(", ");

  return (
    <article className="glass-card group flex h-full flex-col overflow-hidden rounded-xl">
      {/* Capa */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={imagem}
          srcSet={srcSet}
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
          width={800}
          height={600}
          alt={`Arte de capa de ${nome}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/10 to-transparent" />

        {genero && (
          <span className="badge absolute left-3 top-3 rounded-full border border-violet/50 bg-void/70 px-3 py-1 text-[10px] font-bold text-violet-soft backdrop-blur-sm">
            {genero}
          </span>
        )}

        {novo && (
          <span className="badge absolute right-3 top-3 rounded-full bg-magenta px-3 py-1 text-[10px] font-bold text-void">
            Novo
          </span>
        )}

        {avaliacao && (
          <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-void/70 px-2.5 py-1 text-xs font-semibold text-lime backdrop-blur-sm">
            <Star className="h-3.5 w-3.5 fill-lime" strokeWidth={0} />
            {avaliacao.toFixed(1)}
          </span>
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-ink">{nome}</h3>
        {estudio && <p className="mt-0.5 text-xs text-muted-2">por {estudio}</p>}

        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{descricao}</p>

        <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
          <span className="flex items-center gap-1.5 font-display text-lg font-bold text-cyan">
            <Tag className="h-4 w-4" strokeWidth={2.5} />
            {precoFormatado}
          </span>
          <button
            type="button"
            className="btn-outline-neon rounded-md px-4 py-2 text-xs font-bold"
          >
            Ver detalhes
          </button>
        </div>
      </div>
    </article>
  );
}

// React.memo evita re-renderizar cada card quando o pai (Catálogo)
// re-renderiza por causa de outro state (ex: digitando na busca) mas
// as props deste card específico não mudaram.
export default memo(GameCard);
