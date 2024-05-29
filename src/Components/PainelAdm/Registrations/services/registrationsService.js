import { collection, doc, getDocs, serverTimestamp, setDoc, updateDoc } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { db, storage, auth } from "../../../../Database/FirebaseConfig.mjs";


const colRegistrations = collection(db, 'userProfiles');
const bucketPhotos = ref(storage, 'userPhotos');


const getAllRegistrations = () => {

    return getDocs(colRegistrations)
        .then( (snapshot) => {
            let registrations = [];
            snapshot.forEach( (doc) => {
                registrations.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            return registrations;
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
            return getDownloadURL(snapshot.ref);
        })
        .catch( (error) => {
            console.log(error);
            return Error(error.code);
        });

};

const createRegister = async ({ email, photo, ...registerData }) => {
    let uid;
    const password = "123456"; // senha padrão para todos os usuários

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        uid = userCredential.user.uid;

        const userDocRef = doc(colRegistrations, uid);

        await setDoc( userDocRef, {
            uid,
            ...registerData
        });

        const result = await createPhoto(uid, photo);
        if (result instanceof Error) {
            throw new Error('Ocorreu um erro ao subir a imagem para o banco de dados');
        } else {
            await updateDoc(userDocRef, {
                urlPhoto: result,
                createdAt: serverTimestamp()
            });
        }

        return uid;
    } catch (error) {
        console.log(error);
        return new Error(error.code);
    }
};

export const RegistrationsService = {
    getAllRegistrations,
    createRegister
};