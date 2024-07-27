export function getCategoriesByLevel(test, levelNumber) {
    const levelKey = `level_${levelNumber}`;
    const level = test.questions[levelKey];

    if (!level) {
        return [];
    }

    return Object.keys(level).map(key => parseInt(key.split('_')[1], 10));
}

/**
 * 
 * @param {*} test - Documento do teste
 * @param {*} categoryIndices - Vetor com os índices das categorias
 * @param {*} levelNumber - Nível
 * @returns 
 */
export function getQuestionsValues(test, categoryIndices, levelNumber) {
    const levelKey = `level_${levelNumber}`;
    const level = test.questions[levelKey];
    const result = {};

    categoryIndices.forEach(categoryIndex => {
        const categoryKey = `category_${categoryIndex}`;
        const category = level[categoryKey];

        if (!category) {
            console.error(`Categoria ${categoryIndex} não encontrada no ${levelKey}.`);
        } else {
            result[categoryKey] = category;
        }
    });

    return { [levelKey]: result };
}



