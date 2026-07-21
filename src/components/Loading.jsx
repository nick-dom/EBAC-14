import { Loader2 } from "lucide-react";

export default function Loading({ message = "Carregando jogos..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inset-0 rounded-full border-2 border-violet/30" />
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-cyan border-r-violet" />
        <Loader2 className="h-6 w-6 animate-pulse text-violet-soft" />
      </div>
      <p className="font-display text-sm uppercase tracking-[0.2em] text-muted">{message}</p>
    </div>
  );
}

/**
 * Skeleton de card, usado no lugar do GameCard enquanto os dados
 * ainda não chegaram — reforça a sensação de carregamento real.
 */
export function GameCardSkeleton() {
  return (
    <div className="glass-card overflow-hidden rounded-xl">
      <div className="skeleton aspect-[4/3] w-full bg-surface-2" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-4 w-3/4 rounded bg-surface-2" />
        <div className="skeleton h-3 w-1/2 rounded bg-surface-2" />
        <div className="skeleton h-3 w-full rounded bg-surface-2" />
        <div className="skeleton h-3 w-5/6 rounded bg-surface-2" />
        <div className="skeleton mt-4 h-8 w-full rounded bg-surface-2" />
      </div>
    </div>
  );
}
