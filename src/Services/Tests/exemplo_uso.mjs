// main.mjs

import { getCategoriesByLevel, getQuestionsByLevel } from './Category/GetCategorys.mjs';
import { getByTestSerialId } from './GetByTestSerialId.mjs';
import { getTestsFromPatient } from './GetTestsFromPatient.mjs';

(async () => {
  // Pegar todos os testes
  // try {
  //   const allTests = await getAll();
  //   console.log('Lista de testes:', allTests);
  // } catch (error) {
  //   console.error('Erro ao obter todos os testes:', error);
  // }

  // Pegar um teste pelo ID do campo
  const testId = 2; // Substitua pelo ID real do teste
  let test = {};
  try {
    test = await getByTestSerialId(testId);
    if (test) {
      console.log('Dados do teste:', test);
    }
  } catch (error) {
    console.error('Erro ao obter teste pelo ID:', error);
  }

  // Pegar todos os testes de um paciente específico
  const patientId = '0x8uNPqIl69NLNmis58t'; // Substitua pelo ID real do paciente
  try {
    const patientTests = await getTestsFromPatient(patientId);
    console.log('Testes do paciente:', patientTests);

    patientTests.forEach((test, key) => {
      console.log(key, ":",test.situation);
    });
  } catch (error) {
    console.error('Erro ao obter testes do paciente:', error);
  }

  // Exemplo de uso
  const levelNumber = 1; // Nível que você quer pegar as categorias
  // try {
  //   const categories = getCategoriesByLevel(test, levelNumber);
  //   console.log('Categorias no nível', levelNumber, ':', categories);
  // } catch (error) {
  //   console.error('Erro ao obter categorias pelo nível:', error);
  // }
  try {
    const categories = getCategoriesByLevel(test, levelNumber);
    const questions = getQuestionsByLevel(test, categories[0], levelNumber);

    const values = Object.values(questions);

    console.log('categories: ', categories);
    console.log('questions: ', questions);

    console.log('Resultado das questões da categoria', categories[0], ':', questions);
    console.log('Vetor com os resultados', values);
  } catch (error) {
    console.error('Erro ao obter categorias pelo nível:', error);
  }
})();

// const vetor = {
//   question_4: 3,
//   question_5: 1,
//   question_2: 1,
//   question_1: 3,
//   question_9: 2,
//   question_8: 0,
//   question_6: 0,
//   question_3: 3,
//   question_7: 2,
//   question_0: 2
// };

// const length = 15; // Especifique o comprimento desejado

// function preencherEOrdenarQuestoes(vetor, length) {
//   const sortedResults = [];

//   for (let i = 0; i < length; i++) {
//       const questionKey = `question_${i}`;
//       if (resultados.hasOwnProperty(questionKey)) {
//           sortedResults.push(resultados[questionKey]);
//       } else {
//           sortedResults.push(null);
//       }
//   }

//   return sortedResults;
// }

// const questoesOrdenadasEPreenchidas = preencherEOrdenarQuestoes(vetor, length);

// console.log(questoesOrdenadasEPreenchidas);