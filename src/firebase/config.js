// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Web app's Firebase configuration
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

export { db, getDocs, getDoc, collection }