import { db } from "../FirebaseConfig.mjs";
import { doc, getDoc, updateDoc, runTransaction, getDocs, collection, query, where } from "firebase/firestore";

// Função recursiva para percorrer a estrutura de questions
function extractValues(obj, extractedValues, currentPath = '') {
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

/** Busca informações de um teste da coleção tests no firestore
 * 
 * @param {*} testId - Id do teste
 */
async function getTestById(testId) {
    const testDoc = doc(db, "tests", testId);

    try {
        const docSnap = await getDoc(testDoc);

        if (docSnap.exists()) {
            const data = docSnap.data();
            const questionsData = data.questions;
            const extractedValues = {};

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
async function updateQuestionStatus(testId, nivel, indiceCategoria, indiceQuestao, newValue) {
    const testDoc = doc(db, "tests", testId);
    const questionPath = `questions.level_${nivel}.category_${indiceCategoria}.question_${indiceQuestao}`;

    try {
        await updateDoc(testDoc, {
            [questionPath]: newValue
        });
        console.log(`Questão ${indiceQuestao} atualizada com sucesso!`);
        return newValue;
    } catch (error) {
        console.error("Erro ao atualizar a questão:", error);
    }
}

async function addCategoryToLevel(serialId, level, categoryIndex) {
    const testsRef = collection(db, 'tests');
    const testQuery = query(testsRef, where('id', '==', parseInt(serialId)));

    try {
        const querySnapshot = await getDocs(testQuery);

        if (querySnapshot.empty) {
            console.warn(`Documento com serialId ${serialId} não encontrado.`);
            return;
        }

        const testId = querySnapshot.docs[0].id;
        const testRef = doc(db, 'tests', testId);

        await runTransaction(db, async (transaction) => {
            const testDoc = await transaction.get(testRef);

            if (!testDoc.exists()) {
                // Se o documento não existir, cria um novo com o nível e a categoria
                const newDocData = {
                    questions: {
                        [`level_${level}`]: {
                            [`category_${categoryIndex}`]: {}
                        }
                    }
                };
                transaction.set(testRef, newDocData);
            } else {
                // Se o documento existir, verifica e atualiza o nível e a categoria
                const testData = testDoc.data();

                let updatedData = {};
                const levelField = `level_${level}.category_${categoryIndex}`;

                if (!testData.questions) {
                    // Se não houver nenhum nível definido, cria o primeiro nível com a categoria
                    updatedData = {
                        questions: {
                            [`level_${level}`]: {
                                [`category_${categoryIndex}`]: {}
                            }
                        }
                    };
                } else if (!testData.questions[`level_${level}`]) {
                    // Se o nível específico não existir, cria o nível com a categoria
                    updatedData = {
                        questions: {
                            ...testData.questions,
                            [`level_${level}`]: {
                                [`category_${categoryIndex}`]: {}
                            }
                        }
                    };
                } else {
                    // Se o nível existir, apenas adiciona a nova categoria
                    updatedData = {
                        questions: {
                            ...testData.questions,
                            [`level_${level}`]: {
                                ...testData.questions[`level_${level}`],
                                [`category_${categoryIndex}`]: {}
                            }
                        }
                    };
                }

                transaction.update(testRef, updatedData);
            }
        });

        console.log('Categoria adicionada com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar categoria:', error);
    }
}


export { getTestById, updateQuestionStatus, addCategoryToLevel }