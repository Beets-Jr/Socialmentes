export function getCategoriesByLevel(test, levelNumber) {
    const levelKey = `level_${levelNumber}`;
    const level = test.questions[levelKey];

    if (!level) {
        console.error(`Nível ${levelNumber} não encontrado.`);
        return [];
    }

    return Object.keys(level).map(key => parseInt(key.split('_')[1], 10));
}

/**
 * 
 * @param {*} test - Documento
 * @param {*} categoryIndex - Índice da categoria
 * @param {*} levelNumber - Nível
 * @returns 
 */
export function getQuestionsByLevel(test, categoryIndex, levelNumber) {
    const categoryKey = `category_${categoryIndex}`;
    const levelKey = `level_${levelNumber}`;
    const level = test.questions[levelKey];
    const category = level[categoryKey];

    if (!category) {
        console.error(`Categoria ${categoryIndex} não encontrada.`);
        return [];
    }

    return category;
}


