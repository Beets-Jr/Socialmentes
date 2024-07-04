import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import { db } from "../Database/FirebaseConfig.mjs";


const tests = collection(db, 'tests');


const getTestById = (testId) => {

    const docRef = doc(tests, testId);

    return getDoc(docRef)
        .then( (snapshot) => {
            if (!snapshot.exists()) {
                return Error('Teste não encontrado');
            } else {
                return snapshot.data();
            }
        });

}

export const TestService = {
    getTestById
};