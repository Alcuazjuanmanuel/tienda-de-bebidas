// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAy614EnOCsa214OHfbMq-QLQOTWGLFvtQ",
    authDomain: "ecommercereact-1a076.firebaseapp.com",
    projectId: "ecommercereact-1a076",
    storageBucket: "ecommercereact-1a076.appspot.com",
    messagingSenderId: "215661343271",
    appId: "1:215661343271:web:2a50974c22a5d0d9e65402",
    measurementId: "G-HQSSJJ55Q9"
};

// Initialize Firebase
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
 