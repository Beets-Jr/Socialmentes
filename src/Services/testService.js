import { db } from "../Database/FirebaseConfig.mjs";
import { collection, getDocs } from 'firebase/firestore';

export const fetchTests = async () => {
  const querySnapshot = await getDocs(collection(db, 'tests'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const fetchPatientById = async (patientId) => {
  const querySnapshot = await getDocs(collection(db, 'patients'));
  const patientData = querySnapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .find(doc => doc.id === patientId);

  return patientData;
};
