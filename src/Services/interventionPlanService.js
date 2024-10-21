import { addDoc, collection, doc, getDoc, setDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../Database/FirebaseConfig.mjs";

const collectionRef = collection(db, 'interventionPlans');

const dataToJSON = (plan) => {
  return {
    'start_ABA': plan.start_ABA,
    'coordinator_sr': plan.coordinator_sr,
    'coordinator_jr': plan.coordinator_jr,
    'goals': plan.goals,
    'activities': plan.activities,
    'cronogram': plan.cronogram,
    'patientId': plan.patientId,
  };
};

const jsonToData = (json) => {
  return {
    start_ABA: json.start_ABA,
    coordinator_sr: json.coordinator_sr,
    coordinator_jr: json.coordinator_jr,
    goals: json.goals,
    activities: json.activities,
    cronogram: json.cronogram,
    patientId: json.patientId,
  };
};

const addPlan = async (plan) => {
  const planItem = dataToJSON(plan);
  try {
    const docRef = await addDoc(collectionRef, planItem);
    console.log('Plano adicionado com ID: ', docRef.id);
  } catch (e) {
    console.error('Erro ao adicionar Plano: ', e);
    throw new Error('Erro ao adicionar Plano');
  }
};


export { addPlan };