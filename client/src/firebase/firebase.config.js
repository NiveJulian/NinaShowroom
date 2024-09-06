// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABhRtN6HAmKcHw1Hx96YaX7P1LCX2bo88",
  authDomain: "ninashowroom-3dcb7.firebaseapp.com",
  projectId: "ninashowroom-3dcb7",
  storageBucket: "ninashowroom-3dcb7.appspot.com",
  messagingSenderId: "757512827058",
  appId: "1:757512827058:web:4958e562a14eb36cc359ab",
  measurementId: "G-1EP5Q6YW4F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)