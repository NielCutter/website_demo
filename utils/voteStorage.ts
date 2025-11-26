// Centralized vote storage utility with proper persistence

const STORAGE_KEYS = {
  VOTES: 'newculturetrends_productVotes',
  VOTED_PRODUCTS: 'newculturetrends_votedProducts',
  VOTE_HISTORY: 'newculturetrends_voteHistory',
} as const;

// Custom event for vote updates (works in same tab)
const VOTE_UPDATE_EVENT = 'voteUpdate';

export const getVoteCount = (productId: number): number => {
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

export const saveVoteCount = (productId: number, count: number): void => {
  if (typeof window === 'undefined') return;
  try {
    // Get existing votes
    const votes = localStorage.getItem(STORAGE_KEYS.VOTES);
    const votesData = votes ? JSON.parse(votes) : {};
    
    // Update vote count
    votesData[productId] = count;
    
    // Save to localStorage
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
    
    // Also trigger storage event manually for cross-tab sync
    window.dispatchEvent(new StorageEvent('storage', {
      key: STORAGE_KEYS.VOTES,
      newValue: JSON.stringify(votesData),
      storageArea: localStorage
    }));
    
    console.log(`Vote saved: Product ${productId} now has ${count} votes`);
  } catch (error) {
    console.error('Error saving vote count:', error);
    // Try to handle quota exceeded error
    if (error instanceof DOMException && error.code === 22) {
      console.error('LocalStorage quota exceeded. Clearing old vote history...');
      try {
        localStorage.removeItem(STORAGE_KEYS.VOTE_HISTORY);
        // Retry saving
        const votes = localStorage.getItem(STORAGE_KEYS.VOTES);
        const votesData = votes ? JSON.parse(votes) : {};
        votesData[productId] = count;
        localStorage.setItem(STORAGE_KEYS.VOTES, JSON.stringify(votesData));
      } catch (retryError) {
        console.error('Failed to save after cleanup:', retryError);
      }
    }
  }
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

export const subscribeToVoteUpdates = (callback: (productId: number, count: number) => void): (() => void) => {
  if (typeof window === 'undefined') return () => {};
  
  const handleUpdate = (event: Event) => {
    if (event instanceof CustomEvent && event.detail) {
      callback(event.detail.productId, event.detail.count);
    } else if (event instanceof StorageEvent && event.key === STORAGE_KEYS.VOTES && event.newValue) {
      try {
        const votesData = JSON.parse(event.newValue);
        // Notify for all products (or we could track which one changed)
        Object.keys(votesData).forEach(id => {
          callback(Number(id), votesData[id]);
        });
      } catch (error) {
        console.error('Error parsing storage event:', error);
      }
    }
  };
  
  window.addEventListener(VOTE_UPDATE_EVENT, handleUpdate);
  window.addEventListener('storage', handleUpdate);
  
  return () => {
    window.removeEventListener(VOTE_UPDATE_EVENT, handleUpdate);
    window.removeEventListener('storage', handleUpdate);
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

