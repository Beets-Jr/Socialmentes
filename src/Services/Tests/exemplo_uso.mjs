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
  const testId = 11; // Substitua pelo ID real do teste
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
    console.log('Questões da categoria', categories[0], ':', questions);
  } catch (error) {
    console.error('Erro ao obter categorias pelo nível:', error);
  }
})();
