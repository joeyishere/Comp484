import {useState, useEffect} from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJcvZyHuzPSYT7cJ9xQaBgtEFl8NniBos",
  authDomain: "comp484-bd4a2.firebaseapp.com",
  projectId: "comp484-bd4a2",
  storageBucket: "comp484-bd4a2.appspot.com",
  messagingSenderId: "690526706809",
  appId: "1:690526706809:web:bec8ed70d5f9aa931f08a8",
  measurementId: "G-TNF1XCDBLH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// set auth to getAuth function from firebase
const auth = getAuth();

// get firestore from firebase and export it
export const db = getFirestore();

// exports the signup function
export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// exports the logout function
export function logout() {
    return auth.signOut();
}

// exports the login function
export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

// exports function for checking if user is logged in and returns the user
export function useAuth() {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
       const unsub = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
        });
        return () => unsub();
    }, []);
    return currentUser;
}