// getById.mjs

// Importando Firestore do Firebase
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Database/FirebaseConfig.mjs';

// Função para pegar um documento específico da coleção "patients" pelo ID
async function getPatientById(patientId) {
  try {
    const patientDocRef = doc(db, 'patients', patientId);
    const docSnap = await getDoc(patientDocRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log('Nenhum documento encontrado com o ID fornecido.');
      return null;
    }
  } catch (error) {
    console.error("Erro ao pegar documento da coleção 'patients':", error);
    throw error;
  }
}

export { getPatientById };
