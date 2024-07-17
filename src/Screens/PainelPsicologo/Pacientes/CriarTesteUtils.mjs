import { addCategoryToLevel } from "../../../Database/Utils/testsFunctions.mjs";
import { getCategoriaNomesPorNivel } from "../../../Database/Utils/testsInfoFunctions";
import { getCategoriesByLevel } from "../../../Services/Tests/Category/GetCategorys.mjs";

export const loadInitialDataFromLocalStorage = (setTestSerialId, setCategoriasSelecionadas) => {
    try {
        const storedTestSerialId = localStorage.getItem('testId');
        const storedCategoriasSelecionadas = localStorage.getItem('categoriasSelecionadas');

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

export const fetchCategoriasPorNivel = async (nivel, setCategorias) => {
    try {
        const fetchedCategorias = await getCategoriaNomesPorNivel(nivel);
        console.log("Fetched categories:", fetchedCategorias);
        setCategorias(fetchedCategorias);
    } catch (error) {
        console.error("Error fetching categories by level:", error);
    }
};

export const updateCategoriasSelecionadasFromTestDetails = (testDetails, nivel, categorias, setCategoriasSelecionadas) => {
    try {
        if (testDetails) {
            const indicesCategorias = getCategoriesByLevel(testDetails, nivel);
            const categoriasJaSelecionadas = getCategoriasByIndices(categorias, indicesCategorias);
            updateCategoriasSelecionadas(nivel, categoriasJaSelecionadas, setCategoriasSelecionadas);
        }
    } catch (error) {
        console.error("Error updating selected categories from test details:", error);
    }
};

export const getCategoriasByIndices = (categorias, indices) => {
    try {
        // Filtra os índices para remover undefined e ordena
        return indices
            .filter(index => index !== undefined)
            .sort((a, b) => a - b)
            .map(index => categorias[index]);
    } catch (error) {
        console.error("Error getting categories by indices:", error);
        return [];
    }
};

export const updateCategoriasSelecionadas = (nivel, novasCategorias, setCategoriasSelecionadas) => {
    try {
        setCategoriasSelecionadas(prevState => {
            const categoriasAtuais = prevState[nivel] || [];
            const categoriasAtualizadas = [...categoriasAtuais];

            novasCategorias.forEach(novaCategoria => {
                if (novaCategoria && !categoriasAtualizadas.includes(novaCategoria)) {
                    categoriasAtualizadas.push(novaCategoria);
                }
            });

            console.log("Updated selected categories for level:", nivel, categoriasAtualizadas);

            return {
                ...prevState,
                [nivel]: categoriasAtualizadas
            };
        });
    } catch (error) {
        console.error("Error updating selected categories:", error);
    }
};

export const updateDatabase = async (testId, nivel, selectedOption, categorias) => {
    try {
        const categoryIndex = categorias.indexOf(selectedOption);
        console.log("Category index:", categoryIndex);
        if (categoryIndex !== -1) {
            await addCategoryToLevel(testId, nivel, categoryIndex);
            console.log("Database updated successfully");
            return categoryIndex;  // Retorna o índice da categoria
        }
    } catch (error) {
        console.error("Error updating database:", error);
        throw error;  // Re-throw o erro para ser capturado na chamada
    }
    return null;
};

