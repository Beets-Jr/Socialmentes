import { db } from "../Database/FirebaseConfig.mjs";
import { collection, getDocs,  query, orderBy, limit} from 'firebase/firestore';

export const getLastThreeTests = async () => {
    const querySnapshot = await getDocs(collection(db, 'tests'), orderBy('createdAt', 'desc'), orderBy('id', 'desc'), limit(3));
    const onGoingTests = querySnapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(doc => doc.situation === 1)
    .slice(0, 3);

    return onGoingTests;
};

export const getLastThreeFinalizedReports = async () => {
    const querySnapshot = await getDocs(collection(db, 'tests'), orderBy('createdAt', 'desc'), orderBy('id', 'desc'), limit(3));
    const finalizedTests = querySnapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(doc => doc.situation === 0)
    .slice(0, 3);
    
    return finalizedTests;
};

export const getLastThreePatients = async () => {
    const querySnapshot = await getDocs(collection(db, 'patients'), orderBy('createdAt', 'desc'), orderBy('id', 'desc'), limit(3));
    const patient = querySnapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .slice(0, 3);
    
    return patient;
  };