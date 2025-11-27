import { useEffect, useState } from 'react';
import {
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  runTransaction,
  serverTimestamp,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { getUserIP } from '../utils/getUserIP';

export interface PollOption {
  id: string;
  label: string;
  votes: number;
}

export interface PollData {
  id: string;
  question: string;
  isActive: boolean;
  options: PollOption[];
}

const POLL_DOC_ID = 'current';

export function usePollSystem() {
  const [poll, setPoll] = useState<PollData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userVote, setUserVote] = useState<string | null>(null);
  const [voteCounts, setVoteCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const pollRef = doc(db, 'polls', POLL_DOC_ID);
    const unsubscribe = onSnapshot(
      pollRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setPoll({ id: snapshot.id, ...(snapshot.data() as Omit<PollData, 'id'>) });
        } else {
          setPoll(null);
        }
        setLoading(false);
      },
      (pollError) => {
        setError(pollError.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const checkUserVote = async () => {
      try {
        const ip = await getUserIP();
        const voteDocRef = doc(db, 'pollVotes', `${POLL_DOC_ID}_${ip}`);
        const voteSnap = await getDoc(voteDocRef);
        setUserVote(voteSnap.exists() ? (voteSnap.data()?.option as string) : null);
      } catch (error) {
        console.error("Error checking poll vote:", error);
      }
    };

    checkUserVote();
  }, [poll?.id]);

  useEffect(() => {
    if (!poll) return;
    const votesQuery = query(collection(db, 'pollVotes'), where('pollId', '==', POLL_DOC_ID));
    const unsubscribe = onSnapshot(votesQuery, (snapshot) => {
      const counts: Record<string, number> = {};
      snapshot.docs.forEach((docSnap) => {
        const option = docSnap.data().option as string;
        counts[option] = (counts[option] ?? 0) + 1;
      });
      setVoteCounts(counts);
    });
    return () => unsubscribe();
  }, [poll]);

  const hydratedPoll = poll
    ? {
        ...poll,
        options: poll.options.map((option) => ({
          ...option,
          votes: voteCounts[option.id] ?? 0,
        })),
      }
    : null;

  const vote = async (optionId: string) => {
    if (!poll || !poll.isActive) {
      throw new Error('Poll is not active');
    }

    const ip = await getUserIP();
    const voteRef = doc(db, 'pollVotes', `${POLL_DOC_ID}_${ip}`);

    await runTransaction(db, async (transaction) => {
      const voteSnap = await transaction.get(voteRef);
      const previousOption = voteSnap.exists() ? (voteSnap.data()?.option as string) : null;
      
      // If user is changing their vote, allow it
      // If it's the same option, do nothing
      if (previousOption === optionId) {
        return; // Already voted for this option
      }

      // Update or create the vote
      transaction.set(voteRef, {
        option: optionId,
        pollId: POLL_DOC_ID,
        ipAddress: ip,
        votedAt: serverTimestamp(),
      });
    });

    setUserVote(optionId);
  };

  const togglePoll = async (isActive: boolean) => {
    await updateDoc(doc(db, 'polls', POLL_DOC_ID), {
      isActive,
      updatedAt: serverTimestamp(),
    });
  };

  const resetPoll = async () => {
    const pollRef = doc(db, 'polls', POLL_DOC_ID);
    await runTransaction(db, async (transaction) => {
      const pollSnap = await transaction.get(pollRef);
      if (!pollSnap.exists()) return;
      const pollData = pollSnap.data() as PollData;
      const resetOptions = pollData.options.map((option) => ({ ...option, votes: 0 }));
      transaction.update(pollRef, {
        options: resetOptions,
        updatedAt: serverTimestamp(),
      });
    });

    const votesQuery = query(collection(db, 'pollVotes'), where('pollId', '==', POLL_DOC_ID));
    const votesSnapshot = await getDocs(votesQuery);
    await Promise.all(votesSnapshot.docs.map((docSnap) => deleteDoc(docSnap.ref)));
    setUserVote(null);
  };

  const updatePoll = async (question: string, options: PollOption[]) => {
    await setDoc(
      doc(db, 'polls', POLL_DOC_ID),
      {
        question,
        isActive: true,
        options,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  };

  return {
    poll: hydratedPoll,
    loading,
    error,
    vote,
    userVote,
    admin: {
      togglePoll,
      resetPoll,
      updatePoll,
    },
  };
}
