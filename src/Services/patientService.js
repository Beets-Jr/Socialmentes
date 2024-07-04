import { collection, getDocs } from "firebase/firestore";

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

export const PatientService = {
    getAllPatients
};