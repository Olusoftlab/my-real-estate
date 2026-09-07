// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-1c181.firebaseapp.com",
  projectId: "estate-1c181",
  storageBucket: "estate-1c181.firebasestorage.app",
  messagingSenderId: "262460297402",
  appId: "1:262460297402:web:810ef42cf6e4f4a4ab3283"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);