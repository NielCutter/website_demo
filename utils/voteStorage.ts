// Centralized vote storage utility with proper persistence
// Uses both localStorage (for immediate updates) and Firebase (for cross-device sync)

import {
  isFirebaseAvailable,
  getVoteCountFromFirebase,
  saveVoteToFirebase,
  incrementVoteInFirebase,
  subscribeToVoteUpdatesFirebase
} from './firebase';

const STORAGE_KEYS = {
  VOTES: 'newculturetrends_productVotes',
  VOTED_PRODUCTS: 'newculturetrends_votedProducts',
  VOTE_HISTORY: 'newculturetrends_voteHistory',
  FIREBASE_SYNCED: 'newculturetrends_firebaseSynced',
} as const;

// Custom event for vote updates (works in same tab)
const VOTE_UPDATE_EVENT = 'voteUpdate';

export const getVoteCount = async (productId: number): Promise<number> => {
  if (typeof window === 'undefined') return 0;
  
  // Try Firebase first if available
  if (isFirebaseAvailable()) {
    try {
      const firebaseCount = await getVoteCountFromFirebase(productId);
      // Update localStorage with Firebase data
      const votes = localStorage.getItem(STORAGE_KEYS.VOTES);
      const votesData = votes ? JSON.parse(votes) : {};
      votesData[productId] = firebaseCount;
      localStorage.setItem(STORAGE_KEYS.VOTES, JSON.stringify(votesData));
      return firebaseCount;
    } catch (error) {
      console.warn('Firebase read failed, using localStorage:', error);
    }
  }
  
  // Fallback to localStorage
  try {
    const votes = localStorage.getItem(STORAGE_KEYS.VOTES);
    if (!votes) return 0;
    const votesData = JSON.parse(votes);
    const count = votesData[productId];
    return typeof count === 'number' ? count : 0;
  } catch (error) {
    console.error('Error reading vote count:', error);
    return 0;
  }
};

// Synchronous version for immediate UI updates
export const getVoteCountSync = (productId: number): number => {
  if (typeof window === 'undefined') return 0;
  try {
    const votes = localStorage.getItem(STORAGE_KEYS.VOTES);
    if (!votes) return 0;
    const votesData = JSON.parse(votes);
    const count = votesData[productId];
    return typeof count === 'number' ? count : 0;
  } catch (error) {
    console.error('Error reading vote count:', error);
    return 0;
  }
};

export const saveVoteCount = async (productId: number, count: number): Promise<void> => {
  if (typeof window === 'undefined') return;
  
  // Save to localStorage immediately (for instant UI update)
  try {
    const votes = localStorage.getItem(STORAGE_KEYS.VOTES);
    const votesData = votes ? JSON.parse(votes) : {};
    votesData[productId] = count;
    localStorage.setItem(STORAGE_KEYS.VOTES, JSON.stringify(votesData));
    
    // Save timestamp for data integrity
    const timestamp = Date.now();
    const voteHistory = localStorage.getItem(STORAGE_KEYS.VOTE_HISTORY) || '{}';
    const history = JSON.parse(voteHistory);
    if (!history[productId]) history[productId] = [];
    history[productId].push({ count, timestamp });
    localStorage.setItem(STORAGE_KEYS.VOTE_HISTORY, JSON.stringify(history));
    
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new CustomEvent(VOTE_UPDATE_EVENT, { 
      detail: { productId, count } 
    }));
    
    console.log(`Vote saved locally: Product ${productId} now has ${count} votes`);
  } catch (error) {
    console.error('Error saving vote to localStorage:', error);
    // Handle quota exceeded
    if (error instanceof DOMException && error.code === 22) {
      try {
        localStorage.removeItem(STORAGE_KEYS.VOTE_HISTORY);
        const votes = localStorage.getItem(STORAGE_KEYS.VOTES);
        const votesData = votes ? JSON.parse(votes) : {};
        votesData[productId] = count;
        localStorage.setItem(STORAGE_KEYS.VOTES, JSON.stringify(votesData));
      } catch (retryError) {
        console.error('Failed to save after cleanup:', retryError);
      }
    }
  }
  
  // Sync to Firebase (async, don't block)
  if (isFirebaseAvailable()) {
    try {
      const success = await saveVoteToFirebase(productId, count);
      if (success) {
        localStorage.setItem(STORAGE_KEYS.FIREBASE_SYNCED, JSON.stringify({ [productId]: Date.now() }));
        console.log(`Vote synced to Firebase: Product ${productId}`);
      }
    } catch (error) {
      console.warn('Failed to sync vote to Firebase:', error);
    }
  }
};

// Increment vote (atomic operation)
export const incrementVote = async (productId: number): Promise<number> => {
  if (typeof window === 'undefined') return 0;
  
  // Try Firebase first for atomic increment
  if (isFirebaseAvailable()) {
    try {
      const newCount = await incrementVoteInFirebase(productId);
      if (newCount !== null) {
        // Update localStorage with Firebase result
        const votes = localStorage.getItem(STORAGE_KEYS.VOTES);
        const votesData = votes ? JSON.parse(votes) : {};
        votesData[productId] = newCount;
        localStorage.setItem(STORAGE_KEYS.VOTES, JSON.stringify(votesData));
        
        window.dispatchEvent(new CustomEvent(VOTE_UPDATE_EVENT, { 
          detail: { productId, count: newCount } 
        }));
        
        return newCount;
      }
    } catch (error) {
      console.warn('Firebase increment failed, using localStorage:', error);
    }
  }
  
  // Fallback to localStorage
  const currentCount = getVoteCountSync(productId);
  const newCount = currentCount + 1;
  await saveVoteCount(productId, newCount);
  return newCount;
};

export const hasUserVoted = (productId: number): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const votedProducts = localStorage.getItem(STORAGE_KEYS.VOTED_PRODUCTS);
    if (!votedProducts) return false;
    const voted = JSON.parse(votedProducts);
    return Array.isArray(voted) && voted.includes(productId);
  } catch (error) {
    console.error('Error checking vote status:', error);
    return false;
  }
};

export const markAsVoted = (productId: number): void => {
  if (typeof window === 'undefined') return;
  try {
    const votedProducts = localStorage.getItem(STORAGE_KEYS.VOTED_PRODUCTS);
    const voted = votedProducts ? JSON.parse(votedProducts) : [];
    if (!Array.isArray(voted)) {
      localStorage.setItem(STORAGE_KEYS.VOTED_PRODUCTS, JSON.stringify([productId]));
      return;
    }
    if (!voted.includes(productId)) {
      voted.push(productId);
      localStorage.setItem(STORAGE_KEYS.VOTED_PRODUCTS, JSON.stringify(voted));
    }
  } catch (error) {
    console.error('Error marking as voted:', error);
  }
};

export const subscribeToVoteUpdates = (
  productId: number,
  callback: (count: number) => void
): (() => void) => {
  if (typeof window === 'undefined') return () => {};
  
  const unsubscribers: (() => void)[] = [];
  
  // Subscribe to Firebase real-time updates
  if (isFirebaseAvailable()) {
    const firebaseUnsub = subscribeToVoteUpdatesFirebase(productId, callback);
    unsubscribers.push(firebaseUnsub);
  }
  
  // Subscribe to localStorage updates (same-tab and cross-tab)
  const handleUpdate = (event: Event) => {
    if (event instanceof CustomEvent && event.detail && event.detail.productId === productId) {
      callback(event.detail.count);
    } else if (event instanceof StorageEvent && event.key === STORAGE_KEYS.VOTES && event.newValue) {
      try {
        const votesData = JSON.parse(event.newValue);
        if (votesData[productId] !== undefined) {
          callback(votesData[productId]);
        }
      } catch (error) {
        console.error('Error parsing storage event:', error);
      }
    }
  };
  
  window.addEventListener(VOTE_UPDATE_EVENT, handleUpdate);
  window.addEventListener('storage', handleUpdate);
  
  unsubscribers.push(() => {
    window.removeEventListener(VOTE_UPDATE_EVENT, handleUpdate);
    window.removeEventListener('storage', handleUpdate);
  });
  
  return () => {
    unsubscribers.forEach(unsub => unsub());
  };
};

// Debug function to check localStorage
export const debugVoteStorage = () => {
  if (typeof window === 'undefined') return;
  console.log('=== Vote Storage Debug ===');
  console.log('Votes:', localStorage.getItem(STORAGE_KEYS.VOTES));
  console.log('Voted Products:', localStorage.getItem(STORAGE_KEYS.VOTED_PRODUCTS));
  console.log('Vote History:', localStorage.getItem(STORAGE_KEYS.VOTE_HISTORY));
};

