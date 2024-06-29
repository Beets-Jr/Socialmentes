import { collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { db, storage, auth } from "../Database/FirebaseConfig.mjs";


const userProfiles = collection(db, 'userProfiles');
const userPhotos = ref(storage, 'userPhotos');


const getAllUsers = () => {

    return getDocs(userProfiles)
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

const getByPosition = (position) => {

    const q = query(
        userProfiles,
        where('position', '==', position)
    );

    return getDocs(q)
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
    const refUserPhoto = ref( userPhotos, `${uid}.${type}` );

    return uploadBytes(refUserPhoto, photo, metadata)
        .then( (snapshot) => {
            return getDownloadURL(snapshot.ref);
        })
        .catch( (error) => {
            console.log(error);
            return Error(error.code);
        });

};

const createUser = async ({ email, photo, ...registerData }) => {

    const user = auth.currentUser;

    let uid;
    const password = "123456"; // senha padrão para todos os usuários

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email[0], password);
        uid = userCredential.user.uid;

        await auth.updateCurrentUser(user);

        const userDocRef = doc(userProfiles, uid);

        await setDoc( userDocRef, {
            uid,
            email,
            ...registerData
        });

        const result = await createPhoto(uid, photo);
        if (result instanceof Error) {
            throw new Error('Ocorreu um erro ao subir a imagem para o banco de dados');
        } else {
            await updateDoc(userDocRef, {
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

export const UserService = {
    getAllUsers,
    getByPosition,
    createUser
};