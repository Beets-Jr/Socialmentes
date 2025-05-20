import { addDoc, collection, doc, getDoc, setDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../Database/FirebaseConfig.mjs";

const collectionRef = collection(db, 'patients');

const patientToJSON = (patient) => {
  return {
    'children': {
      'name': patient.name,
      'cpf': patient.cpf,
      'rg': patient.rg,
      'dateBirth': patient.birth,
    },
    'address': {
      'cep': patient.cep,
      'city': patient.city,
      'neighborhood': patient.neighborhood,
      'number': patient.number,
      'state': patient.uf,
      'street': patient.street,
      'addressDetails': patient.complement,
    },
    'caregivers': {
      'caregiver1': {
        'kinship': patient.kinship1,
        'name': patient.name1,
        'cpf': patient.cpf1,
        'rg': patient.rg1,
        'email': patient.email1,
        'dateBirth': patient.birth1,
        'phone': patient.cell1,
      },
      'caregiver2': {
        'kinship': patient.kinship2,
        'name': patient.name2,
        'cpf': patient.cpf2,
        'rg': patient.rg2,
        'email': patient.email2,
        'dateBirth': patient.birth2,
        'phone': patient.cell2,
      },
    },
    'externalMonitoring': patient.externalAccompaniments,
    'school': {
      'name': patient.school,
      'series': patient.seriesSchool,
      'phone': patient.phoneSchool,
      'email': patient.mailSchool,
    },
    'interventionTeams': patient.interventionTeams,
    'financialResponsible': patient.responsible,
    'profissionalResponsible': patient.responsibleSchool,
    'observation': patient.obs,
  };
};

const jsonToPatient = (json) => {
  return {
    name: json.children.name,
    cpf: json.children.cpf,
    rg: json.children.rg,
    birth: json.children.dateBirth,
    cep: json.address.cep,
    city: json.address.city,
    neighborhood: json.address.neighborhood,
    number: json.address.number,
    uf: json.address.state,
    street: json.address.street,
    complement: json.address.addressDetails,
    kinship1: json.caregivers.caregiver1.kinship,
    name1: json.caregivers.caregiver1.name,
    cpf1: json.caregivers.caregiver1.cpf,
    rg1: json.caregivers.caregiver1.rg,
    cell1: json.caregivers.caregiver1.phone,
    email1: json.caregivers.caregiver1.email,
    birth1: json.caregivers.caregiver1.dateBirth,
    kinship2: json.caregivers.caregiver2.kinship,
    name2: json.caregivers.caregiver2.name,
    cpf2: json.caregivers.caregiver2.cpf,
    rg2: json.caregivers.caregiver2.rg,
    cell2: json.caregivers.caregiver2.phone,
    email2: json.caregivers.caregiver2.email,
    birth2: json.caregivers.caregiver2.dateBirth,
    school: json.school?.name || '',
    seriesSchool: json.school?.series  || '',
    phoneSchool: json.school?.phone  || '',
    mailSchool: json.school?.email  || '',
    responsibleSchool: json?.profissionalResponsible  || '',
    responsible: json.financialResponsible,
    externalAccompaniments: json.externalMonitoring,
    interventionTeams: json.interventionTeams,
    obs: json.observation,
  };
};

const addPatient = async (patientData) => {
  const patientItem = patientToJSON(patientData);
  try {
    console.log(patientItem);
    const docRef = await addDoc(collectionRef, patientItem);
    console.log('Paciente adicionado com ID: ', docRef.id);
  } catch (e) {
    console.error('Erro ao adicionar paciente: ', e);
    throw new Error('Erro ao adicionar paciente');
  }
};

const getPatient = async (id) => {
  const patientRef = doc(db, 'patients', id);
  const patientSnap = await getDoc(patientRef);
  if (patientSnap.exists()) {
    return patientSnap.data();
  } else {
    console.error('Paciente não encontrado');
    throw new Error('Paciente não encontrado');
  }
}

const editPatient = async (id, patientData) => {
  const patientItem = patientToJSON(patientData);
  try {
    await setDoc(doc(db, 'patients', id), patientItem);
    console.log('Paciente editado com sucesso');
  } catch (e) {
    console.error('Erro ao editar paciente: ', e);
    throw new Error('Erro ao editar paciente');
  }
};

const deletePatient = async (id) => {
  const patientRef = doc(db, 'patients', id);
  try {
    await deleteDoc(patientRef);
  } catch (e) {
    console.error('Erro ao deletar paciente: ', e);
    throw new Error('Erro ao deletar paciente');
  }
};

export { addPatient, getPatient, editPatient, jsonToPatient };

const getAllPatients = () => {
  return getDocs(collectionRef)
      .then( (snapshot) => {
          let list = [];
          snapshot.forEach( (doc) => {
              list.push({
                  id: doc.id,
                  ...doc.data()
              });
          });
          return list;
      });
};

export const PatientService = {
  getAllPatients,
  deletePatient
};