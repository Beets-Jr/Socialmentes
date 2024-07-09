import { db } from "../FirebaseConfig.mjs";
import { doc, getDoc } from "firebase/firestore";

/**
 * Função para recuperar os dados de um teste pelo Id
 * @param {string} testId - O Id do teste
 */
async function getTestById(testId) {
    const testDoc = doc(db, "tests", testId);

    try {
        const docSnap = await getDoc(testDoc);

        if (docSnap.exists()) {
            const data = docSnap.data();
                return {
                    id: data.id,
                    patientId: data.patientId,
                    patientName: data.patientName,
                    situation: data.situation,
                    testType: data.testType,
                    timestamp: data.timestamp
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

export default getTestById;