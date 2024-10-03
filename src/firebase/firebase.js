import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Import Storage

const firebaseConfig = {
  apiKey: "AIzaSyDXVOVW6L4OUJ_lzl7h-udBqQ6rxPs20VE",
  authDomain: "security-system-68a7c.firebaseapp.com",
  projectId: "security-system-68a7c",
  storageBucket: "security-system-68a7c.appspot.com",
  messagingSenderId: "819962526221",
  appId: "1:819962526221:web:fe8f8df65425129734f344",
  measurementId: "G-QMFTD5F6FF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Initialize Firebase Storage
const storage = getStorage(app); // Initialize Storage

export { app, auth, storage }; // Export storage
