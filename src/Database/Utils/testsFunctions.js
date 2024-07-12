import { db } from "../FirebaseConfig.mjs";
import { doc, getDoc, updateDoc } from "firebase/firestore";

/** Busca informações de um teste da coleção tests no firestore
 * 
 * @param {*} testId - Id do teste
 */
export async function getTestById(testId) {
    const testDoc = doc(db, "tests", testId);

    try {
        const docSnap = await getDoc(testDoc);

        if (docSnap.exists()) {
            const data = docSnap.data();
            const questionsData = data.questions;
            const extractedValues = {};

            // Função recursiva para percorrer a estrutura de questions
            function extractValues(obj, currentPath = '') {
                Object.keys(obj).forEach(key => {
                    const value = obj[key];
                    const newPath = currentPath ? `${currentPath}.${key}` : key;

                    if (typeof value === 'object' && value !== null) {
                        extractValues(value, newPath);
                    } else {
                        extractedValues[newPath] = value;
                    }
                });
            }

            // Percorrer a estrutura de questions
            extractValues(questionsData);

            return {
                id: data.id,
                patientId: data.patientId,
                patientName: data.patientName,
                questions: data.questions,
                situation: data.situation,
                testType: data.testType,
                timestamp: data.timestamp,
                extractedValues
            };
        } else {
            console.warn(`Documento ${testId} não encontrado.`);
            return null;
        }
    } catch (error) {
        console.error("Erro ao recuperar o documento:", error);
        return null;
    }
}

/**
 * Atualiza o status de uma questão específica no Firestore.
 *
 * @param {string} testId - ID do teste.
 * @param {number} nivel - Nível da questão.
 * @param {string} indiceCategoria - Índice da categoria da questão.
 * @param {string} questionKey - Chave da questão
 * @param {string} newValue - Novo valor para a questão.
 */
export async function updateQuestionStatus(testId, nivel, indiceCategoria, indiceQuestao, newValue) {
    const testDoc = doc(db, "tests", testId);
    const questionPath = `questions.level_${nivel}.category_${indiceCategoria}.question_${indiceQuestao}`;

    try {
        await updateDoc(testDoc, {
            [questionPath]: newValue
        });
        console.log(`Questão ${indiceQuestao} atualizada com sucesso!`);
        return ;
    } catch (error) {
        console.error("Erro ao atualizar a questão:", error);
    }
}