import { addDoc, collection, doc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { db, storage, auth } from "../../../../Database/FirebaseConfig.mjs";
import { createUserWithEmailAndPassword } from "firebase/auth";


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

        await addDoc(colRegistrations, {
            uid,
            ...registerData
        });

        const result = await createPhoto(uid, photo);
        if (result instanceof Error) {
            throw new Error('Ocorreu um erro ao subir a imagem para o banco de dados');
        } else {
            const refDoc = doc(colRegistrations, uid);
            await updateDoc(refDoc, {
                photoUrl: result,
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