import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";       // Tu autenticación actual
import { getFirestore } from "firebase/firestore"; // Tu base de datos actual
import { getStorage } from "firebase/storage";   //  AGREGA ESTA IMPORTACIÓN


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

// Exportar los servicios para usarlos en tus componentes
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);  // 👈 3. AGREGA "export" ANTES DE LA VARIABLE
