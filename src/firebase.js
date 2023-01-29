import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHiedm0kXxndHSef-Mw5_Gq4oKmvD7qDk",
  authDomain: "code-test-efe03.firebaseapp.com",
  projectId: "code-test-efe03",
  storageBucket: "code-test-efe03.appspot.com",
  messagingSenderId: "1066848861815",
  appId: "1:1066848861815:web:25374340a7a97e26a21072",
  measurementId: "G-HYR1FM01R0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
