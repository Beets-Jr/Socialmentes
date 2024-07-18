import { db } from "../../Database/FirebaseConfig.mjs";
import {
    doc,
    getDoc,
    updateDoc,
    runTransaction,
    getDocs,
    collection,
    query,
    where,
    setDoc,
} from "firebase/firestore";

/**
 * Função recursiva para percorrer a estrutura de perguntas e extrair os valores.
 * 
 * @param {Object} obj Objeto contendo a estrutura de perguntas.
 * @param {Object} extractedValues Objeto onde os valores extraídos serão armazenados.
 * @param {string} currentPath Caminho atual na estrutura de perguntas (opcional).
 */
function extractValues(obj, extractedValues, currentPath = "") {
    Object.keys(obj).forEach((key) => {
        const value = obj[key];
        const newPath = currentPath ? `${currentPath}.${key}` : key;

        if (typeof value === "object" && value !== null) {
            extractValues(value, newPath);
        } else {
            extractedValues[newPath] = value;
        }
    });
}

/**
 * Busca informações de um teste no Firestore pelo ID do teste.
 *
 * @param {string} testId ID do teste a ser buscado.
 * @returns {Object|null} Objeto contendo as informações do teste ou null se não encontrado.
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
                extractedValues,
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
 * Atualiza os valores das perguntas em um documento de teste específico no Firestore.
 *
 * @param {string} testId ID do teste a ser atualizado.
 * @param {Object} questionValues Novos valores das perguntas a serem atualizados.
 * @returns {Object|null} Retorna os novos valores das perguntas atualizados ou null em caso de erro.
 */
async function updateQuestionValues(testId, questionValues) {
    const testsRef = collection(db, "tests");
    const testQuery = query(testsRef, where("id", "==", parseInt(testId)));

    try {
        const querySnapshot = await getDocs(testQuery);

        if (querySnapshot.empty) {
            console.warn(`Documento com testId ${testId} não encontrado.`);
            return null;
        }

        const testDocId = querySnapshot.docs[0].id;
        const testRef = doc(db, "tests", testDocId);

        await runTransaction(db, async (transaction) => {
            const testDoc = await transaction.get(testRef);

            if (!testDoc.exists()) {
                console.warn(`Documento ${testDocId} não encontrado.`);
                return;
            }

            let updatedQuestions = { ...testDoc.data().questions };

            // Mescla os novos valores com os existentes
            Object.keys(questionValues).forEach(level => {
                if (!updatedQuestions[level]) {
                    updatedQuestions[level] = {};
                }
                Object.keys(questionValues[level]).forEach(category => {
                    if (!updatedQuestions[level][category]) {
                        updatedQuestions[level][category] = {};
                    }
                    Object.keys(questionValues[level][category]).forEach(question => {
                        updatedQuestions[level][category][question] = questionValues[level][category][question];
                    });
                });
            });

            // Atualiza o campo questions no documento existente
            transaction.update(testRef, {
                questions: updatedQuestions,
            });
        });

        console.log(`Question values updated successfully for testId ${testId}!`);
        return questionValues;
    } catch (error) {
        console.error("Erro ao atualizar question values:", error);
        throw error; // Propaga o erro para que seja tratado no chamador da função
    }
}


/**
 * Adiciona uma nova categoria a um nível específico em um documento de teste no Firestore.
 *
 * @param {string} serialId ID serial do teste onde a categoria será adicionada.
 * @param {number} level Nível onde a categoria será adicionada.
 * @param {number} categoryIndex Índice da nova categoria a ser adicionada.
 */
async function addCategoryToLevel(serialId, level, categoryIndex) {
    const testsRef = collection(db, "tests");
    const testQuery = query(testsRef, where("id", "==", parseInt(serialId)));

    try {
        const querySnapshot = await getDocs(testQuery);

        if (querySnapshot.empty) {
            console.warn(`Documento com serialId ${serialId} não encontrado.`);
            return;
        }

        const testId = querySnapshot.docs[0].id;
        const testRef = doc(db, "tests", testId);

        await runTransaction(db, async (transaction) => {
            const testDoc = await transaction.get(testRef);

            if (!testDoc.exists()) {
                // Se o documento não existir, cria um novo com o nível e a categoria
                const newDocData = {
                    questions: {
                        [`level_${level}`]: {
                            [`category_${categoryIndex}`]: {},
                        },
                    },
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
                                [`category_${categoryIndex}`]: {},
                            },
                        },
                    };
                } else if (!testData.questions[`level_${level}`]) {
                    // Se o nível específico não existir, cria o nível com a categoria
                    updatedData = {
                        questions: {
                            ...testData.questions,
                            [`level_${level}`]: {
                                [`category_${categoryIndex}`]: {},
                            },
                        },
                    };
                } else {
                    // Se o nível existir, apenas adiciona a nova categoria
                    updatedData = {
                        questions: {
                            ...testData.questions,
                            [`level_${level}`]: {
                                ...testData.questions[`level_${level}`],
                                [`category_${categoryIndex}`]: {},
                            },
                        },
                    };
                }

                transaction.update(testRef, updatedData);
            }
        });

        console.log("Categoria adicionada com sucesso!");
    } catch (error) {
        console.error("Erro ao adicionar categoria:", error);
    }
}

/**
 * Cria um documento na coleção tests para determinado paciente
 * @param {*} patientId 
 * @param {string} patientName 
 */
async function createTestForPatient(patientId, patientName) {
    let serialId;
    try {
        await runTransaction(db, async (transaction) => {
            const counterDocRef = doc(db, 'counters/tests');
            const counterDoc = await transaction.get(counterDocRef);

            if (!counterDoc.exists()) {
                throw new Error("O documento do contador não existe!");
            }

            const newCount = counterDoc.data().count + 1;

            // Atualizar o contador no Firestore
            transaction.update(counterDocRef, { count: newCount });

            // Criar um ID serial usando o novo contador
            serialId = newCount;

            // Criar a referência ao novo documento de teste (ID gerado automaticamente)
            const testDocRef = doc(collection(db, 'tests'));

            // Definir os campos do documento do teste
            const testData = {
                id: serialId,
                patientId: patientId,
                patientName: patientName,
                questions: {}, // Inicializar como um objeto vazio ou outro valor padrão, conforme necessário
                situation: 0,
                testType: "denver",
                timestamp: new Date().toISOString() // Converte a data atual para string ISO 8601
            };

            // Inserir o documento na coleção 'tests'
            transaction.set(testDocRef, testData);
        });

        console.log("Teste criado com sucesso!");
        return serialId;
    } catch (error) {
        console.error("Erro ao criar teste: ", error);
    }
}


export { getTestById, updateQuestionValues, addCategoryToLevel, createTestForPatient };
