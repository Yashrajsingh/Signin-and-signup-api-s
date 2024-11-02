// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernestate-161f5.firebaseapp.com",
  projectId: "mernestate-161f5",
  storageBucket: "mernestate-161f5.firebasestorage.app",
  messagingSenderId: "712574937063",
  appId: "1:712574937063:web:d052666c63752376a2bf42"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);