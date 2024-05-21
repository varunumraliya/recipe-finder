// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import 'firebase/database';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4sT802spQpS_zIITQ_fm6ab8cVhuBqmI",
  authDomain: "recipe-finder-5e48b.firebaseapp.com",
  projectId: "recipe-finder-5e48b",
  storageBucket: "recipe-finder-5e48b.appspot.com",
  messagingSenderId: "413602454614",
  appId: "1:413602454614:web:38b8d77d087f01dff7eff7",
  measurementId: "G-8DM17PGECC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app); // Initialize Firestore

export { auth, db }; 