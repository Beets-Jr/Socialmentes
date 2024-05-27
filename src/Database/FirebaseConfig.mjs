/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Configuração do Firebase usando variáveis de ambiente para fins de testes preliminares

// Your web app's Firebase configuration (configuração correta)
const firebaseConfig = {
  apiKey: "AIzaSyDRf2z_EtQpMcFfj4_0ALIPM7IQw8LFX6Q",
  authDomain: "social-mentes.firebaseapp.com",
  projectId: "social-mentes",
  storageBucket: "social-mentes.appspot.com",
  messagingSenderId: "822396829515",
  appId: "1:822396829515:web:36af07f5425a84d9fe72ce",
  measurementId: "G-6VXGXT687G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}


export const db = getFirestore(app);