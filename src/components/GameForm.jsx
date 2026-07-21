import { useState } from "react";
import { PlusCircle, ImageIcon, AlertCircle, CheckCircle2 } from "lucide-react";

const ESTADO_INICIAL = {
  nome: "",
  preco: "",
  descricao: "",
  imagem: "",
  genero: "",
  estudio: "",
};

// Imagens de exemplo (reais, livres para uso) sugeridas quando o campo
// "imagem" é deixado em branco, para que o card cadastrado nunca fique quebrado.
const IMAGENS_PADRAO = [
  "https://images.unsplash.com/photo-1754851539824-5a87c5c7cb86?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1636070759654-5c93bbca2862?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1567093322102-6bdd32fba67d?auto=format&fit=crop&w=800&q=80",
];

/**
 * GameForm — equivalente ao "ProdutoForm" pedido no exercício.
 * Formulário 100% controlado pelo React (useState). Campos obrigatórios:
 * nome, preço e descrição — os demais são opcionais.
 * Ao enviar, chama onAdicionar(novoJogo) recebido via props, que é quem
 * efetivamente atualiza a lista de produtos no componente pai (Catalogo.jsx).
 */
export default function GameForm({ onAdicionar }) {
  const [form, setForm] = useState(ESTADO_INICIAL);
  const [erros, setErros] = useState({});
  const [enviado, setEnviado] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // limpa o erro do campo assim que o usuário volta a digitar
    if (erros[name]) {
      setErros((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validar() {
    const novosErros = {};
    if (!form.nome.trim()) novosErros.nome = "Informe o nome do jogo.";
    if (!form.preco) {
      novosErros.preco = "Informe o preço.";
    } else if (Number(form.preco) <= 0) {
      novosErros.preco = "O preço deve ser maior que zero.";
    }
    if (!form.descricao.trim()) novosErros.descricao = "Descreva brevemente o jogo.";
    return novosErros;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const novosErros = validar();
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    const novoJogo = {
      id: Date.now(),
      nome: form.nome.trim(),
      preco: Number(form.preco),
      descricao: form.descricao.trim(),
      imagem:
        form.imagem.trim() ||
        IMAGENS_PADRAO[Math.floor(Math.random() * IMAGENS_PADRAO.length)],
      genero: form.genero.trim() || "Indie",
      estudio: form.estudio.trim() || "Estúdio independente",
      avaliacao: null,
      novo: true,
    };

    onAdicionar(novoJogo);
    setForm(ESTADO_INICIAL);
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
  }

  const campoBase =
    "w-full rounded-md border bg-void/60 px-4 py-3 text-sm text-ink placeholder:text-muted-2 focus:outline-none transition-colors";

  return (
    <form onSubmit={handleSubmit} noValidate className="glass-card rounded-xl p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-md border border-violet/50 bg-violet/10">
          <PlusCircle className="h-5 w-5 text-violet-soft" />
        </span>
        <div>
          <h3 className="font-display text-lg font-bold text-ink">Cadastrar novo jogo</h3>
          <p className="text-xs text-muted">Adicione um título ao catálogo do Nexus Verse</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Nome */}
        <div className="sm:col-span-2">
          <label htmlFor="nome" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted">
            Nome do jogo *
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            value={form.nome}
            onChange={handleChange}
            placeholder="Ex: Solar Wraith"
            className={`${campoBase} ${erros.nome ? "border-magenta" : "border-white/10 focus:border-violet"}`}
          />
          {erros.nome && <CampoErro texto={erros.nome} />}
        </div>

        {/* Preço */}
        <div>
          <label htmlFor="preco" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted">
            Preço (R$) *
          </label>
          <input
            id="preco"
            name="preco"
            type="number"
            min="0"
            step="0.01"
            value={form.preco}
            onChange={handleChange}
            placeholder="49.90"
            className={`${campoBase} ${erros.preco ? "border-magenta" : "border-white/10 focus:border-violet"}`}
          />
          {erros.preco && <CampoErro texto={erros.preco} />}
        </div>

        {/* Gênero */}
        <div>
          <label htmlFor="genero" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted">
            Gênero
          </label>
          <input
            id="genero"
            name="genero"
            type="text"
            value={form.genero}
            onChange={handleChange}
            placeholder="Ex: Metroidvania"
            className={`${campoBase} border-white/10 focus:border-violet`}
          />
        </div>

        {/* Estúdio */}
        <div>
          <label htmlFor="estudio" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted">
            Estúdio
          </label>
          <input
            id="estudio"
            name="estudio"
            type="text"
            value={form.estudio}
            onChange={handleChange}
            placeholder="Ex: Nome do seu estúdio"
            className={`${campoBase} border-white/10 focus:border-violet`}
          />
        </div>

        {/* Imagem */}
        <div>
          <label htmlFor="imagem" className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted">
            <ImageIcon className="h-3.5 w-3.5" /> URL da capa
          </label>
          <input
            id="imagem"
            name="imagem"
            type="url"
            value={form.imagem}
            onChange={handleChange}
            placeholder="https://..."
            className={`${campoBase} border-white/10 focus:border-violet`}
          />
        </div>

        {/* Descrição */}
        <div className="sm:col-span-2">
          <label htmlFor="descricao" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted">
            Descrição *
          </label>
          <textarea
            id="descricao"
            name="descricao"
            rows={3}
            value={form.descricao}
            onChange={handleChange}
            placeholder="Conte do que se trata o jogo em poucas frases..."
            className={`${campoBase} resize-none ${erros.descricao ? "border-magenta" : "border-white/10 focus:border-violet"}`}
          />
          {erros.descricao && <CampoErro texto={erros.descricao} />}
        </div>
      </div>

      <div className="mt-7 flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-xs text-muted-2">* Campos obrigatórios</p>
        <button
          type="submit"
          className="btn-neon inline-flex w-full items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-bold text-ink sm:w-auto"
        >
          <PlusCircle className="h-4 w-4" />
          Adicionar ao catálogo
        </button>
      </div>

      {enviado && (
        <div className="mt-5 flex items-center gap-2 rounded-md border border-lime/40 bg-lime/10 px-4 py-3 text-sm text-lime">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          Jogo adicionado ao catálogo com sucesso!
        </div>
      )}
    </form>
  );
}

function CampoErro({ texto }) {
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-magenta">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      {texto}
    </p>
  );
}
