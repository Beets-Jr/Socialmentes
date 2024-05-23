import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { createContext, useState } from 'react'
import { getDoc, doc } from 'firebase/firestore'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { db, auth } from '../Database/FirebaseConfig.mjs'

export const UserContext =  createContext()

export const UserStorage = ({children}) => {

    const test = auth.currentUser

    const [userData, setUserData] = useState(null)
    const [login, setLogin] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function getUser(id){
        const docRef = doc(db, 'userProfiles', id)
        const userSnap = getDoc(docRef);
        const json = userSnap.data()
        setUserData(json)
        setLogin(true)
        console.log(userData)
    }

    async function userLogin(email, password){
        signInWithEmailAndPassword(auth, email, password)
        console.log(test)
        const userID = '8zfTawMY4sWnqSxKh0Q9ntDCNx42'
        getUser(userID)
    }

    return(
        <UserContext.Provider value={{userLogin, userData}}>
            {children}
        </UserContext.Provider>
    )
}