import { addCategoryToLevel } from "../../../Services/Tests/testsFunctions.mjs";
import { getCategoriaNomesPorNivel } from "../../../Services/Tests/testsInfoFunctions";
import { getCategoriesByLevel } from "../../../Services/Tests/Category/GetCategorys.mjs";

/**
 * Carrega dados iniciais do localStorage para o teste, como o ID do teste e categorias selecionadas.
 * 
 * @param {Function} setTestSerialId Função para definir o ID do teste no estado.
 * @param {Function} setCategoriasSelecionadas Função para definir as categorias selecionadas no estado.
 */
export const loadInitialDataFromLocalStorage = (
  setTestSerialId,
  setCategoriasSelecionadas
) => {
  try {
    const storedTestSerialId = localStorage.getItem("testId");
    const storedCategoriasSelecionadas = localStorage.getItem(
      "categoriasSelecionadas"
    );

    if (storedTestSerialId) {
      console.log("Loaded test ID from local storage:", storedTestSerialId);
      setTestSerialId(storedTestSerialId);
    }

    if (storedCategoriasSelecionadas) {
      console.log("Loaded selected categories from local storage");
      setCategoriasSelecionadas(JSON.parse(storedCategoriasSelecionadas));
    }
  } catch (error) {
    console.error("Error loading initial data from local storage:", error);
  }
};

/**
 * Carrega as categorias dado um nível específico.
 * 
 * @param {number} nivel Nível das categorias a serem carregadas.
 * @param {Function} setCategorias Função para definir as categorias no estado.
 */
export const fetchCategoriasPorNivel = async (nivel, setCategorias) => {
  try {
    const fetchedCategorias = await getCategoriaNomesPorNivel(nivel);
    console.log("Fetched categories:", fetchedCategorias);
    setCategorias(fetchedCategorias);
  } catch (error) {
    console.error("Error fetching categories by level:", error);
  }
};

/**
 * Atualiza as categorias selecionadas com base nos detalhes do teste e no nível fornecido.
 * 
 * @param {*} testDetails Detalhes do teste que contêm informações sobre as categorias selecionadas.
 * @param {number} nivel Nível das categorias a serem atualizadas.
 * @param {Array} categorias Lista de categorias disponíveis para o nível fornecido.
 * @param {Function} setCategoriasSelecionadas Função para definir as categorias selecionadas no estado.
 */
export const updateCategoriasSelecionadasFromTestDetails = (
  testDetails,
  nivel,
  categorias,
  setCategoriasSelecionadas
) => {
  try {
    if (testDetails) {
      const indicesCategorias = getCategoriesByLevel(testDetails, nivel);
      const categoriasJaSelecionadas = getCategoriasByIndices(
        categorias,
        indicesCategorias
      );
      updateCategoriasSelecionadas(
        nivel,
        categoriasJaSelecionadas,
        setCategoriasSelecionadas
      );
    }
  } catch (error) {
    console.error(
      "Error updating selected categories from test details:",
      error
    );
  }
};

/**
 * Obtém categorias com base em uma lista de índices fornecidos.
 * 
 * @param {Array} categorias Lista de categorias.
 * @param {Array} indices Lista de índices para as categorias desejadas.
 * @returns {Array} Lista de categorias correspondentes aos índices fornecidos.
 */
export const getCategoriasByIndices = (categorias, indices) => {
  try {
    // Filtra os índices para remover undefined e ordena
    return indices
      .filter((index) => index !== undefined)
      .sort((a, b) => a - b)
      .map((index) => categorias[index]);
  } catch (error) {
    console.error("Error getting categories by indices:", error);
    return [];
  }
};

/**
 * Atualiza as categorias selecionadas para um determinado nível com novas categorias.
 * 
 * @param {number} nivel Nível das categorias a serem atualizadas.
 * @param {Array} novasCategorias Novas categorias a serem adicionadas.
 * @param {Function} setCategoriasSelecionadas Função para definir as categorias selecionadas no estado.
 */
export const updateCategoriasSelecionadas = (
  nivel,
  novasCategorias,
  setCategoriasSelecionadas
) => {
  try {
    setCategoriasSelecionadas((prevState) => {
      const categoriasAtuais = prevState[nivel] || [];
      const categoriasAtualizadas = [...categoriasAtuais];

      novasCategorias.forEach((novaCategoria) => {
        if (novaCategoria && !categoriasAtualizadas.includes(novaCategoria)) {
          categoriasAtualizadas.push(novaCategoria);
        }
      });

      console.log(
        "Updated selected categories for level:",
        nivel,
        categoriasAtualizadas
      );

      return {
        ...prevState,
        [nivel]: categoriasAtualizadas,
      };
    });
  } catch (error) {
    console.error("Error updating selected categories:", error);
  }
};
  