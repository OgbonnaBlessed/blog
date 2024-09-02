// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "blog-f8f2b.firebaseapp.com",
  projectId: "blog-f8f2b",
  storageBucket: "blog-f8f2b.appspot.com",
  messagingSenderId: "972526346281",
  appId: "1:972526346281:web:83d22e73d97f6be0763c38"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);