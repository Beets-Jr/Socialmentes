import { addDoc, collection, doc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore/lite";

import { db, storage } from "../../../Database/FirebaseConfig.mjs";
import { ref, uploadBytes } from "firebase/storage";


// const colRegistrations = collection(db, 'userProfiles');
const colRegistrations = collection(db, 'cadastros');
const bucketPhotos = ref(storage, 'userPhotos');


const getAllRegistrations = (setRegistrations) => {

    return getDocs(colRegistrations)
        .then( (snapshot) => {
            let registrations = [];
            snapshot.forEach( (doc) => {
                registrations.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            setRegistrations(registrations);
        });

};

const createPhoto = (uid, photo) => {

    const type = photo.type.substring(photo.type.lastIndexOf('/') + 1);

    const metadata = {
        contentType: photo.type
    };
    const refUserPhoto = ref( bucketPhotos, `${uid}.${type}` );

    return uploadBytes(refUserPhoto, photo, metadata)
        .then( (snapshot) => {
            return snapshot.metadata.fullPath;
        })
        .catch( (error) => {
            console.log(error);
            return Error(error.code);
        });

};

const createRegister = ({ photo, ...registerData }) => {

    let uid = undefined;

    return addDoc( colRegistrations, {
        ...registerData
    })
        .then( (snapshot) => {
            uid = snapshot.id;
            return createPhoto(uid, photo);
        })
        .then( (result) => {
            if (result instanceof Error) {
                return result;
            } else {
                const refDoc = doc(colRegistrations, uid);
                return updateDoc(refDoc, {
                    photoUrl: result,
                    createdAt: serverTimestamp()
                })
            }
        })
        .then( (result) => {
            if (result instanceof Error) {
                return result;
            } else {
                return uid;
            }
        })
        .catch( (error) => {
            console.log(error);
            return Error(error.code);
        });

};

export const RegistrationsService = {
    getAllRegistrations,
    createRegister
};