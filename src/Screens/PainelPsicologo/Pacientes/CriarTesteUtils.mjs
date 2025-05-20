import { getCategoriesByLevel } from "../../../Services/Tests/Category/GetCategorys.mjs";
import { getCategoriesNamesByLevel } from "../../../Services/Tests/testsInfoFunctions";

/**
 * Carrega dados iniciais do localStorage para o teste, como o ID do teste e categorias selecionadas.
 * 
 * @param {Function} setTestSerialId Função para definir o ID do teste no estado.
 * @param {Function} setCategoriasSelecionadas Função para definir as categorias selecionadas no estado.
 */
// export const loadInitialDataFromLocalStorage = (
//   setTestSerialId,
//   setCategoriasSelecionadas
// ) => {
//   try {
//     const storedTestSerialId = localStorage.getItem("testId");
//     const storedCategoriasSelecionadas = localStorage.getItem(
//       "categoriasSelecionadas"
//     );

//     if (storedTestSerialId) {
//       setTestSerialId(storedTestSerialId);
//     }

//     if (storedCategoriasSelecionadas) {
//       setCategoriasSelecionadas(JSON.parse(storedCategoriasSelecionadas));
//     }
//   } catch (error) {
//     console.error("Error loading initial data from local storage:", error);
//   }
// };

/**
 * Carrega as categorias dado um nível específico.
 * 
 * @param {number} level Nível das categorias a serem carregadas.
 * @param {Function} setCategories Função para definir as categorias no estado.
 */
export const fetchCategoriesByLevel = (level, setCategories) => {
  try {
    const fetchedCategories = getCategoriesNamesByLevel(level);
    setCategories(fetchedCategories);
  } catch (error) {
    console.error("Error fetching categories by level:", error);
  }
};

/**
 * Obtém categorias com base em uma lista de índices fornecidos.
 * 
 * @param {Array} categories Lista de categorias.
 * @param {Array} indexes Lista de índices para as categorias desejadas.
 * @returns {Array} Lista de categorias correspondentes aos índices fornecidos.
 */

export const getCategoriesByIndexes = (categories, indexes) => {
  try {
    return indexes
      .filter((index) => index !== undefined)
      .sort((a, b) => a - b)
      .map((index) => categories[index]);
  } catch (error) {
    console.error("Error getting categories by indexes:", error);
    return [];
  }
};

/**
 * Atualiza as categorias selecionadas com base nos detalhes do teste e no nível fornecido.
 * 
 * @param {*} testDetails Detalhes do teste que contêm informações sobre as categorias selecionadas.
 * @param {number} level Nível das categorias a serem atualizadas.
 * @param {Array} categories Lista de categorias disponíveis para o nível fornecido.
 * @param {Function} setSelectedCategories Função para definir as categorias selecionadas no estado.
 */

export const updateSelectedCategoriesFromTestInformations = (
  testDetails,
  level,
  categories,
  setSelectedCategories
) => {
  try {
    if (testDetails) {
      const categoryIndexes = getCategoriesByLevel(testDetails, level);
      const alreadySelectedCategories = getCategoriesByIndexes(
        categories,
        categoryIndexes
      );
      updateSelectedCategories(
        level,
        alreadySelectedCategories,
        setSelectedCategories
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
 * Atualiza as categorias selecionadas para um determinado nível com novas categorias.
 * 
 * @param {number} level Nível das categorias a serem atualizadas.
 * @param {Array} newCategories Novas categorias a serem adicionadas.
 * @param {Function} setSelectedCategories Função para definir as categorias selecionadas no estado.
 */
export const updateSelectedCategories = (
  level,
  newCategories,
  setSelectedCategories
) => {
  try {
    setSelectedCategories((prevState) => {
      const currentCategories = prevState[level] || [];
      const updatedCategories = [...currentCategories];

      newCategories.forEach((newCategory) => {
        if (newCategory && !updatedCategories.includes(newCategory)) {
          updatedCategories.push(newCategory);
        }
      });

      return {
        ...prevState,
        [level]: updatedCategories,
      };
    });
  } catch (error) {
    console.error("Error updating selected categories:", error);
  }
};

/**
 * Atualiza valores selecionados com base no nível, índice de categoria, índice da questão e valor.
 * 
 * @param {number} level Nível da categoria.
 * @param {number} categoryIndex Índice da categoria.
 * @param {number} questionIndex Índice da questão (opcional).
 * @param {any} value Valor para atualizar (opcional).
 * @param {Array} categories Lista de todas as categorias disponíveis.
 * @param {Array} selectedCategories Lista de categorias já selecionadas.
 * @param {Function} setQuestionValues Função para definir os valores das questões no estado.
 * @param {*} testDetails Detalhes do teste para armazenar informações sobre as questões.
 * @param {Function} setTestDetails Função para definir as informações do teste no estado.
 */
export const handleSelectedValuesChange = (
  level,
  categoryIndex,
  questionIndex = null,
  value = null,
  categories,
  selectedCategories,
  setQuestionValues,
  testDetails,
  setTestDetails
) => {
  const selectedCategory =
    selectedCategories[level] && selectedCategories[level][categoryIndex];
  if (!selectedCategory) return;

  const generalCategoryIndex = categories.findIndex(
    (cat) => cat === selectedCategory
  );

  setQuestionValues((prevValues) => {
    const updatedValues = { ...prevValues };

    if (!updatedValues[`level_${level}`]) {
      updatedValues[`level_${level}`] = {};
    }

    if (!updatedValues[`level_${level}`][`category_${generalCategoryIndex}`]) {
      updatedValues[`level_${level}`][`category_${generalCategoryIndex}`] = {};
    }

    if (questionIndex !== null && value !== null) {
      updatedValues[`level_${level}`][`category_${generalCategoryIndex}`][
        `question_${questionIndex}`
      ] = value;
    }

    const updatedTestDetails = { ...testDetails, questions: updatedValues };
    setTestDetails(updatedTestDetails);

    return updatedValues;
  });
};
