// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHqzy6Zhn-iQNVzDqSFblnndYfofA4GuM",
  authDomain: "carro-compras-react.firebaseapp.com",
  projectId: "carro-compras-react",
  storageBucket: "carro-compras-react.firebasestorage.app",
  messagingSenderId: "1032230025064",
  appId: "1:1032230025064:web:85d8ef5efe630a49aa08dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios
export const db = getFirestore(app);
export const auth = getAuth(app);
