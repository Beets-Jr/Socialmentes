
/**
 * 
 * @param {*} test 
 * @param {*} levelNumber 
 * @returns 
 */
export function getCategoriesByLevel(test, levelNumber) {
  const levelKey = `level_${levelNumber}`;
  const level = test?.questions[levelKey];

  if (!level) {
    console.warn(`Nível ${levelKey} não encontrado em test.questions`);
    return [];
  }

  // Verifique se a chave category_X pertence ao nível correto
  const indices = Object.keys(level).map(key => {
    const extractedIndex = parseInt(key.split('_')[1], 10);
    
    // Adicione uma verificação de nível ou categoria aqui, se necessário
    // console.log(`Categoria encontrada no ${levelKey}:`, key);
    
    return extractedIndex;
  });
  
  return indices;
}

/**
 * 
 * @param {*} test - Documento do teste
 * @param {*} categoryIndices - Vetor com os índices das categorias
 * @param {*} levelNumber - Nível
 * @returns 
 */
export function getQuestions(test, categoryIndices, levelNumber) {
  const levelKey = `level_${levelNumber}`;
  const level = test.questions[levelKey];
  const result = {};

  categoryIndices.forEach((categoryIndex) => {
    const categoryKey = `category_${categoryIndex}`;
    const category = level[categoryKey];

    if (!category) {
      console.error(`Categoria ${categoryIndex} não encontrada no ${levelKey}.`);
    } else {
      result[categoryKey] = category;
      // console.log(`Categoria adicionada: ${categoryKey}`, category);  // Log para acompanhar
    }
  });

  return { [levelKey]: result };
}
  



