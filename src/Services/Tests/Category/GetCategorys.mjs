export function getCategoriesByLevel(test, levelNumber) {
    const levelKey = `level_${levelNumber}`;
    const level = test.questions[levelKey];

    if (!level) {
        console.error(`Nível ${levelNumber} não encontrado.`);
        return [];
    }

    return Object.keys(level).map(key => parseInt(key.split('_')[1], 10));
}

export function getQuestionsByLevel(test, categoryNumber, levelNumber) {
    const categoryKey = `category_${categoryNumber}`;
    const levelKey = `level_${levelNumber}`;
    const level = test.questions[levelKey];
    const category = level[categoryKey];

    if (!category) {
        console.error(`Categoria ${categoryNumber} não encontrada.`);
        return [];
    }

    return category;
}


