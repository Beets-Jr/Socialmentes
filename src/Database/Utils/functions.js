import { denver } from "../denver";

// 1. Recuperar o nome das categorias dado o nível
export function getCategoriaNomesPorNivel(nivel) {
    const nivelData = denver.find(n => n.nivel === nivel);
    if (nivelData) {
        return nivelData.categorias.map(categoria => categoria.nome);
    }
    return [];
}

// 2. Recuperar as perguntas dado o nível e dada a categoria
export function getPerguntasPorNivelECategoria(nivel, categoriaNome) {
    const nivelData = denver.find(n => n.nivel === nivel);
    if (nivelData) {
        const categoria = nivelData.categorias.find(c => c.nome === categoriaNome);
        if (categoria) {
            return categoria.perguntas.map(pergunta => pergunta.pergunta);
        }
    }
    return [];
}
