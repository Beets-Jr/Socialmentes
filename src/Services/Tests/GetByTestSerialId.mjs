// getTestById.mjs

// Importando Firestore do Firebase
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Database/FirebaseConfig.mjs';

async function getByTestSerialId(testId) {
  try {
    const testsCollection = collection(db, 'tests');
    const snapshot = await getDocs(testsCollection);
    
    const test = snapshot.docs
      .map(doc => ({ ...doc.data() }))
      .find(test => test.id === testId);
    
    if (test) {
      return test;
    } else {
      console.log('Nenhum documento encontrado com o ID fornecido.');
      return null;
    }
  } catch (error) {
    console.error("Erro ao pegar documento da coleção 'tests':", error);
    throw error;
  }
}

export { getByTestSerialId };
