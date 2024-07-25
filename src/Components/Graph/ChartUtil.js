import denver from '../../Database/denver.json';

const nameFromDenver = (denver) => {
  const mapName = {};
  denver.forEach(level => {
    const levelId = `level_${level.nivel}`;
    mapName[levelId] = {};
    level.categorias.forEach(category => {
      mapName[levelId][`category_${category.id}`] = category.nome;
    });
  });
  return mapName;
};


const accumulateQuestions = (dataList) => {
  const accumulatedQuestions = {};
  const names = nameFromDenver(denver);

  dataList.forEach(data => {
    const levels = Object.keys(data.questions);

    levels.forEach(level => {
      if (!accumulatedQuestions[level]) {
        accumulatedQuestions[level] = {};
      }

      const categories = Object.keys(data.questions[level]);

      categories.forEach(category => {
        if (!accumulatedQuestions[level][category]) {
          const levelName = level.replace('level_', '');
          const categoryName = names[level][category] || 'Categoria não encontrada';

          accumulatedQuestions[level][category] = {
            name: `${categoryName} - Nivel ${levelName}`,
            Esperado: 0,
            Adquirido: 0,
            'Adquirido Parcial': 0,
            'Adquirido e Parcial': 0,
            'Adquirido Anterior': 0,
            'Adquirido Parcial Anterior': 0,
            'Adquirido e Parcial Anterior': 0,
          };
        }

        const questions = Object.values(data.questions[level][category]);
        accumulatedQuestions[level][category].Esperado += questions.length;
      });
    });
  });

  const accumulatedQuestionsList = [];
  Object.keys(accumulatedQuestions).forEach(level => {
    Object.keys(accumulatedQuestions[level]).forEach(category => {
      accumulatedQuestionsList.push(accumulatedQuestions[level][category]);
    });
  });

  return accumulatedQuestionsList;
};


const transformIndividualData = (individualData, accumulatedQuestionsList, previousData = null) => {
  const levels = Object.keys(individualData.questions);
  const names = nameFromDenver(denver);

  levels.forEach((level) => {
    const categories = Object.keys(individualData.questions[level]);

    categories.forEach((category) => {
      const questions = Object.values(individualData.questions[level][category]);
      const acquired = questions.filter(val => val === 3).length;
      const partial = questions.filter(val => val === 2).length;
      const sumPartial = acquired + partial;

      const accumulatedQuestionData = accumulatedQuestionsList.find(
        item => item.name === `${names[level][category]} - Nivel ${level.replace('level_', '')}`
      );

      if (accumulatedQuestionData) {
        accumulatedQuestionData.Esperado = questions.length;
        accumulatedQuestionData.Adquirido = acquired;
        accumulatedQuestionData['Adquirido Parcial'] = partial;
        accumulatedQuestionData['Adquirido e Parcial'] = sumPartial;
      }
    });
  });

  if (previousData) {
    const previousLevels = Object.keys(previousData.questions);

    previousLevels.forEach((level) => {
      const categories = Object.keys(previousData.questions[level]);

      categories.forEach((category) => {
        const previousQuestions = Object.values(previousData.questions[level][category]);
        const acquiredPrevious = previousQuestions.filter(val => val === 3).length;
        const partialPrevious = previousQuestions.filter(val => val === 2).length;
        const sumPartialPrevious = acquiredPrevious + partialPrevious;

        const accumulatedQuestionData = accumulatedQuestionsList.find(
          item => item.name === `${names[level][category]} - Nivel ${level.replace('level_', '')}`
        );

        if (accumulatedQuestionData) {
          accumulatedQuestionData['Adquirido Anterior'] = (accumulatedQuestionData['Adquirido Anterior'] || 0) + acquiredPrevious;
          accumulatedQuestionData['Adquirido Parcial Anterior'] = (accumulatedQuestionData['Adquirido Parcial Anterior'] || 0) + partialPrevious;
          accumulatedQuestionData['Adquirido e Parcial Anterior'] = (accumulatedQuestionData['Adquirido e Parcial Anterior'] || 0) + sumPartialPrevious;
        } else {
          const levelName = level.replace('level_', '');
          const categoryName = names[level][category] || 'Categoria não encontrada';
          const obj = {
            name: `${categoryName} - Nivel ${levelName}`,
            Esperado: 0,
            Adquirido: 0,
            'Adquirido Parcial': 0,
            'Adquirido e Parcial': 0,
            'Adquirido Anterior': acquiredPrevious,
            'Adquirido Parcial Anterior': partialPrevious,
            'Adquirido e Parcial Anterior': sumPartialPrevious,
          }
          accumulatedQuestionsList.push(obj);
        }
      });
    });
  }

  return accumulatedQuestionsList.sort((a, b) => a.name.localeCompare(b.name));
};

export { accumulateQuestions, transformIndividualData };
