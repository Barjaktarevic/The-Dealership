// Imported functions for interacting with the database
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, onSnapshot, doc, updateDoc } from "firebase/firestore";

// Web app's Firebase configuration; deliberately pushed to Github like this so that you can run the project
const firebaseConfig = {
    apiKey: "AIzaSyA8Hqp-2TvFoVmfPwSpOXiFaB6DtR5_Mzs",
    authDomain: "thedealership-e5273.firebaseapp.com",
    projectId: "thedealership-e5273",
    storageBucket: "thedealership-e5273.appspot.com",
    messagingSenderId: "241582736463",
    appId: "1:241582736463:web:dd08b84931f662be13563a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize DB
const db = getFirestore();

export { db, getDocs, getDoc, collection, onSnapshot, doc, updateDoc }