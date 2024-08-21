// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAy_3rljL49rC0mg1NRdzeL7VqvnhZpybk",
  authDomain: "ecommerce-mendoza.firebaseapp.com",
  projectId: "ecommerce-mendoza",
  storageBucket: "ecommerce-mendoza.appspot.com",
  messagingSenderId: "806853421358",
  appId: "1:806853421358:web:ce9d5c2327c5ff4abeb2bf",
  measurementId: "G-2DP3YNG948",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)