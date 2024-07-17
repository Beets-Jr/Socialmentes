import { addCategoryToLevel } from "../../../Database/Utils/testsFunctions.mjs";
import { getCategoriaNomesPorNivel } from "../../../Database/Utils/testsInfoFunctions";
import { getCategoriesByLevel } from "../../../Services/Tests/Category/GetCategorys.mjs";

export const loadInitialDataFromLocalStorage = (setTestSerialId, setCategoriasSelecionadas) => {
    const storedTestSerialId = localStorage.getItem('testSerialId');
    const storedCategoriasSelecionadas = localStorage.getItem('categoriasSelecionadas');

    if (storedTestSerialId) {
        console.log("Loaded test ID from local storage:", storedTestSerialId);
        setTestSerialId(storedTestSerialId);
    }

    if (storedCategoriasSelecionadas) {
        console.log("Loaded selected categories from local storage");
        setCategoriasSelecionadas(JSON.parse(storedCategoriasSelecionadas));
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
    if (testDetails) {
        const indicesCategorias = getCategoriesByLevel(testDetails, nivel);
        const categoriasJaSelecionadas = getCategoriasByIndices(categorias, indicesCategorias);
        updateCategoriasSelecionadas(nivel, categoriasJaSelecionadas, setCategoriasSelecionadas);
    }
};

export const getCategoriasByIndices = (categorias, indices) => {
    return indices.map(index => categorias[index]);
};

export const updateCategoriasSelecionadas = (nivel, novasCategorias, setCategoriasSelecionadas) => {
    setCategoriasSelecionadas(prevState => {
        const categoriasAtuais = prevState[nivel] || [];
        const categoriasAtualizadas = [...new Set([...categoriasAtuais, ...novasCategorias])];
        console.log("Updated selected categories for level:", nivel, categoriasAtualizadas);
        return {
            ...prevState,
            [nivel]: categoriasAtualizadas
        };
    });
};

export const updateDatabase = async (testId, nivel, selectedOption, categorias) => {
    try {
        const categoryIndex = categorias.indexOf(selectedOption);
        await addCategoryToLevel(testId, nivel, categoryIndex);
        console.log("Database updated successfully");
    } catch (error) {
        console.error("Error updating database:", error);
    }
};
