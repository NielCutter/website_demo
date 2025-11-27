// Firebase configuration
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

if (
  !firebaseConfig.apiKey ||
  !firebaseConfig.authDomain ||
  !firebaseConfig.projectId ||
  !firebaseConfig.storageBucket ||
  !firebaseConfig.appId
) {
  throw new Error(
    "Missing Firebase environment configuration. Please define the VITE_FIREBASE_* variables in your .env file."
  );
}

const app: FirebaseApp = getApps()[0] ?? initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.useDeviceLanguage();

const db = getFirestore(app);
const storage = getStorage(app);

if (typeof window !== "undefined") {
  try {
    getAnalytics(app);
  } catch (error) {
    console.warn("Firebase analytics unavailable:", error);
  }
}

export const ensureAnonymousUser = async () => {
  if (!auth.currentUser) {
    await signInAnonymously(auth);
  }
};

export { app, auth, db, storage };
