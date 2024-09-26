import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "hotstargpt-9b070.firebaseapp.com",
  projectId: "hotstargpt-9b070",
  storageBucket: "hotstargpt-9b070.appspot.com",
  messagingSenderId: "143583734507",
  appId: "1:143583734507:web:f6c594819e4a4e8f4a6cae",
  measurementId: "G-K6XXK3XRY8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line 
const analytics = getAnalytics(app);
export const auth = getAuth();