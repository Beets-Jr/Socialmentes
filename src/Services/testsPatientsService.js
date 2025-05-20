import { collection, doc, getDoc, getDocs, orderBy, query, where, updateDoc } from "firebase/firestore";
import { db } from "../Database/FirebaseConfig.mjs";

const getPatientById = async (patientId) => {
  try {
    const patientDocRef = doc(db, 'patients', patientId);
    const patientDoc = await getDoc(patientDocRef);
    if (!patientDoc.exists()) {
      console.log('Paciente não encontrado!');
      return null;
    }
    return patientDoc.data();
  } catch (error) {
    console.error('Erro ao puxar dados do paciente:', error);
    throw error;
  }
};

const getTestsByIds = async (testIds) => {
  try {
    if (testIds.length === 0) {
      return [];
    }
    const testsQuery = query(collection(db, 'tests'), where('id', 'in', testIds), orderBy('id'));
    const testsSnapshot = await getDocs(testsQuery);
    return testsSnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error('Erro ao puxar dados dos testes:', error);
    throw error;
  }
};

const getTestById = async (testId) => {
  try {
    const testDocRef = doc(db, 'tests', testId);
    const testDoc = await getDoc(testDocRef);
    if (!testDoc.exists()) {
      console.log('Teste não encontrado!');
      return null;
    }
    return testDoc.data();
  } catch (error) {
    console.error('Erro ao puxar dados do teste:', error);
    throw error;
  }
}

const getTestsByPatientId = async (patientId) => {
  try {
    const testsQuery = query(
      collection(db, 'tests'),
      where('patientId', '==', patientId),
      orderBy('id')
    );
    const testsSnapshot = await getDocs(testsQuery);
    return testsSnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error('Erro ao puxar dados dos testes:', error);
    throw error;
  }
}

const getTestByIdTest = async (testId) => {
  const q = query(
    collection(db, 'tests'),
    where('id', '==', Number(testId) )
  );
  try {
    const querySnapshot = await getDocs(q);
    const docData = querySnapshot.docs[0].data();
    if (!docData) {
      console.log('Teste não encontrado!');
      return null;
    }
    return docData;
  } catch (error) {
    console.error('Erro ao puxar dados do teste:', error);
    throw error;
  }
}

export const updateTestSituation = async (testId) => {
  const q = query(
    collection(db, 'tests'),
    where('id', '==', Number(testId))
  );
  try {
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log('Nenhum documento encontrado com esse testId');
      return;
    }

    const docRef = querySnapshot.docs[0].ref;

    await updateDoc(docRef, {
      situation: 1
    });

  } catch (error) {
    console.error('Erro ao atualizar dados do teste:', error);
    throw error;
  }
}

export { getPatientById, getTestsByIds, getTestById, getTestsByPatientId, getTestByIdTest };
