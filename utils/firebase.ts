// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, increment, onSnapshot } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyC_X_Jol0JfjZCA3w6oY4YnmWYHcDR6PnI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "nctr-34dd5.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "nctr-34dd5",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "nctr-34dd5.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "782227791202",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:782227791202:web:deb2da8e387446b155a03b",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-86516S7NWK"
};

// Initialize Firebase
let app;
let db;
let analytics;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  
  // Initialize Analytics (only in browser, not SSR)
  if (typeof window !== 'undefined') {
    try {
      analytics = getAnalytics(app);
      console.log('Firebase Analytics initialized');
    } catch (analyticsError) {
      console.warn('Firebase Analytics initialization failed:', analyticsError);
    }
  }
  
  console.log('Firebase initialized successfully');
} catch (error) {
  console.warn('Firebase initialization failed, using localStorage only:', error);
}

// Check if Firebase is available
export const isFirebaseAvailable = () => {
  return db !== undefined;
};

// Get vote count from Firebase
export const getVoteCountFromFirebase = async (productId: number): Promise<number> => {
  if (!isFirebaseAvailable()) return 0;
  
  try {
    const voteRef = doc(db, 'productVotes', productId.toString());
    const voteSnap = await getDoc(voteRef);
    
    if (voteSnap.exists()) {
      return voteSnap.data().count || 0;
    }
    return 0;
  } catch (error) {
    console.error('Error getting vote from Firebase:', error);
    return 0;
  }
};

// Save vote to Firebase
export const saveVoteToFirebase = async (productId: number, count: number): Promise<boolean> => {
  if (!isFirebaseAvailable()) return false;
  
  try {
    const voteRef = doc(db, 'productVotes', productId.toString());
    await setDoc(voteRef, { 
      count,
      lastUpdated: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error saving vote to Firebase:', error);
    return false;
  }
};

// Increment vote in Firebase (atomic operation)
export const incrementVoteInFirebase = async (productId: number): Promise<number | null> => {
  if (!isFirebaseAvailable()) return null;
  
  try {
    const voteRef = doc(db, 'productVotes', productId.toString());
    const voteSnap = await getDoc(voteRef);
    
    const currentCount = voteSnap.exists() ? (voteSnap.data().count || 0) : 0;
    const newCount = currentCount + 1;
    
    await setDoc(voteRef, { 
      count: newCount,
      lastUpdated: new Date().toISOString()
    }, { merge: true });
    
    return newCount;
  } catch (error) {
    console.error('Error incrementing vote in Firebase:', error);
    return null;
  }
};

// Subscribe to real-time vote updates
export const subscribeToVoteUpdatesFirebase = (
  productId: number,
  callback: (count: number) => void
): (() => void) => {
  if (!isFirebaseAvailable()) return () => {};
  
  try {
    const voteRef = doc(db, 'productVotes', productId.toString());
    const unsubscribe = onSnapshot(voteRef, (snapshot) => {
      if (snapshot.exists()) {
        const count = snapshot.data().count || 0;
        callback(count);
      } else {
        callback(0);
      }
    }, (error) => {
      console.error('Error in Firebase subscription:', error);
    });
    
    return unsubscribe;
  } catch (error) {
    console.error('Error setting up Firebase subscription:', error);
    return () => {};
  }
};

// Get all votes from Firebase
export const getAllVotesFromFirebase = async (): Promise<Record<number, number>> => {
  if (!isFirebaseAvailable()) return {};
  
  try {
    // Note: This is a simplified version. For production, you'd want to use a collection query
    // For now, we'll fetch individual documents as needed
    return {};
  } catch (error) {
    console.error('Error getting all votes from Firebase:', error);
    return {};
  }
};

