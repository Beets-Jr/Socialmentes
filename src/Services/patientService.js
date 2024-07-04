import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import { db } from "../Database/FirebaseConfig.mjs";


const patients = collection(db, 'patients');


const getAllPatients = () => {

    return getDocs(patients)
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

const getPatientById = (patientId) => {

    const docRef = doc(patients, patientId);

    return getDoc(docRef)
        .then( (snapshot) => {
            if (!snapshot.exists()) {
                return Error('Paciente não encontrado');
            } else {
                return snapshot.data();
            }
        });

}

export const PatientService = {
    getAllPatients,
    getPatientById
};