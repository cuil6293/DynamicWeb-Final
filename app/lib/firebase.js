import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "final-e4b71.firebaseapp.com",
  projectId: "final-e4b71",
  storageBucket: "final-e4b71.firebasestorage.app",
  messagingSenderId: "115344229621",
  appId: "1:115344229621:web:13341b400320b9e01171bc",
};

Object.keys(firebaseConfig).forEach((key) => {
  const configValue = firebaseConfig[key] + "";
  if (configValue.charAt(0) === '"') {
    firebaseConfig[key] = configValue.substring(1, configValue.length - 1);
  }
});

export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
