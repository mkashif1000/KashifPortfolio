// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA1VVovHtgLq0V9b-sLoDh_Xn2zN3mX848",
    authDomain: "kashif-portfolio-blog.firebaseapp.com",
    projectId: "kashif-portfolio-blog",
    storageBucket: "kashif-portfolio-blog.firebasestorage.app",
    messagingSenderId: "104394967153",
    appId: "1:104394967153:web:0f4b7b421106bab87a33d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
