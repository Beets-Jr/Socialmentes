/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}


export const db = getFirestore(app);
