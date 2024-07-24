// getAll.mjs

// Importando o Firestore do Firebase
import { collection, getDocs } from 'firebase/firestore';
import {db} from "../../Database/FirebaseConfig.mjs"

// Função para pegar todos os documentos da coleção "patients"
async function getAllPatients() {
  try {
    const patientsCollection = collection(db, 'patients');
    const snapshot = await getDocs(patientsCollection);
    const patientsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return patientsList;
  } catch (error) {
    console.error("Erro ao pegar documentos da coleção 'patients':", error);
    throw error;
  }
}

export { getAllPatients };
