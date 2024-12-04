// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArbHaR5VN08p4SycUMslVYimliu9BFvYc",
  authDomain: "e-commerce-e65d7.firebaseapp.com",
  projectId: "e-commerce-e65d7",
  storageBucket: "e-commerce-e65d7.firebasestorage.app",
  messagingSenderId: "117811901219",
  appId: "1:117811901219:web:f747e174f62355b882d296",
  measurementId: "G-W55YFTSE1Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const fireDB = getFirestore(app);
const auth = getAuth(app)

export {fireDB,auth };