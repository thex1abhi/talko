// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "talko-32d8c.firebaseapp.com",
    projectId: "talko-32d8c",
    storageBucket: "talko-32d8c.firebasestorage.app",
    messagingSenderId: "613249334146",
    appId: "1:613249334146:web:b8b55d66a8f8bd27696d9b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth()
const provider = new GoogleAuthProvider()

export { auth, provider }