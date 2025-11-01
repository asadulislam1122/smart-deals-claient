import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDqiW2f5Lnj6e5LlWfqe8ZNMhLTss0AX9o",
  authDomain: "smart-deals-app-86c20.firebaseapp.com",
  projectId: "smart-deals-app-86c20",
  storageBucket: "smart-deals-app-86c20.firebasestorage.app",
  messagingSenderId: "842614338715",
  appId: "1:842614338715:web:b5c5a7874b1165ea92c23e",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
