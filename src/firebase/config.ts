import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyC_X_Jol0JfjZCA3w6oY4YnmWYHcDR6PnI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "nctr-34dd5.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "nctr-34dd5",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "nctr-34dd5.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "782227791202",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:782227791202:web:deb2da8e387446b155a03b",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-86516S7NWK",
};

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]!;
}

const auth = getAuth(app);
auth.useDeviceLanguage();

const db = getFirestore(app);
const storage = getStorage(app);

if (typeof window !== 'undefined') {
  try {
    getAnalytics(app);
  } catch (error) {
    console.warn('Firebase analytics unavailable:', error);
  }
}

export const ensureAnonymousUser = async () => {
  if (!auth.currentUser) {
    await signInAnonymously(auth);
  }
};

export { app, auth, db, storage };
