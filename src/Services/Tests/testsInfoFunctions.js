import { denver } from "../../Database/denver";

// recuperar o nome das categorias dado o nível
export function getCategoriesNamesByLevel(nivel) {
  const nivelData = denver.find((n) => n.nivel === nivel);
  if (nivelData) {
    return nivelData.categorias.map((categoria) => categoria.nome);
  }
  return [];
}

// recuperar as perguntas dado o nível e dada a categoria
export function getPerguntasPorNivelECategoria(nivel, categoriaNome) {
  const nivelData = denver.find((n) => n.nivel === nivel);
  if (nivelData) {
    const categoria = nivelData.categorias.find(
      (c) => c.nome === categoriaNome
    );
    if (categoria) {
      return categoria.perguntas.map((pergunta) => pergunta.pergunta);
    }
  }
  return [];
}

// recuperar as descricoes dado o nível e dada a categoria
export function getDescricoesPorNivelECategoria(nivel, categoriaNome) {
  const nivelData = denver.find((n) => n.nivel === nivel);
  if (nivelData) {
    const categoria = nivelData.categorias.find(
      (c) => c.nome === categoriaNome
    );
    if (categoria) {
      return categoria.perguntas.map((pergunta) => pergunta.descricao);
    }
  }
  return [];
}
