// getAllTests.mjs

// Importando Firestore do Firebase
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Database/FirebaseConfig.mjs';

// Função para pegar todos os documentos da coleção "tests"
async function getAll() {
  try {
    const testsCollection = collection(db, 'tests');
    const snapshot = await getDocs(testsCollection);
    const testsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return testsList;
  } catch (error) {
    console.error("Erro ao pegar documentos da coleção 'tests':", error);
    throw error;
  }
}

export { getAll };
