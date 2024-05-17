import { collection, getDocs, deleteDoc } from 'firebase/firestore/lite';
import { db } from '../FirebaseConfig.mjs';

export const clearCollection = async (collectionName) => {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));

        // Verifica se há documentos para exclusão
        if (querySnapshot.size === 0) {
            console.log(`Collection ${collectionName} is already empty.`);
            return;
        }

        // Itera sobre os documentos e os exclui individualmente
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });

        console.log(`Collection ${collectionName} cleared successfully.`);
    } catch (error) {
        console.error(`Error clearing collection ${collectionName}: `, error);
    }
};
