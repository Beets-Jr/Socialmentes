// getTestsFromPatient.mjs

// Importando Firestore do Firebase
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../Database/FirebaseConfig.mjs';

// Função para pegar todos os documentos da coleção "tests" que possuem o campo "patientId" igual ao parâmetro fornecido
async function getTestsFromPatient(patientId) {
  try {
    const testsCollection = collection(db, 'tests');
    const q = query(testsCollection, where('patientId', '==', patientId));
    const snapshot = await getDocs(q);
    const testsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return testsList;
  } catch (error) {
    console.error("Erro ao pegar documentos da coleção 'tests':", error);
    throw error;
  }
}

export { getTestsFromPatient };
