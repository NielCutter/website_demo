import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  where,
  limit as limitQuery,
  serverTimestamp,
  type QueryConstraint,
  type WhereFilterOp,
} from 'firebase/firestore';
import { db } from '../firebase/config';

type WhereTuple = [string, WhereFilterOp, unknown];

interface UseFirestoreCollectionOptions {
  orderByField?: string;
  orderDirection?: 'asc' | 'desc';
  whereClause?: WhereTuple;
  limit?: number;
}

export function useFirestoreCollection<T extends { id?: string }>(
  path: string,
  options: UseFirestoreCollectionOptions = {}
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const constraints: QueryConstraint[] = [];
    if (options.whereClause) {
      constraints.push(where(options.whereClause[0], options.whereClause[1], options.whereClause[2]));
    }
    if (options.orderByField) {
      constraints.push(orderBy(options.orderByField, options.orderDirection ?? 'desc'));
    }
    if (options.limit) {
      constraints.push(limitQuery(options.limit));
    }

    const ref = collection(db, path);
    const q = constraints.length ? query(ref, ...constraints) : ref;

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((docSnapshot) => ({
          id: docSnapshot.id,
          ...(docSnapshot.data() as Omit<T, 'id'>),
        })) as T[];
        setData(docs);
        setLoading(false);
      },
      (snapshotError) => {
        setError(snapshotError.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [path, options.orderByField, options.orderDirection, options.limit, JSON.stringify(options.whereClause)]);

  // Helper function to remove undefined values from objects
  const removeUndefined = (obj: Record<string, unknown>): Record<string, unknown> => {
    const cleaned: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value !== undefined) {
        cleaned[key] = value;
      }
    }
    return cleaned;
  };

  const addDocument = async (payload: Omit<T, 'id'>) => {
    const cleanedPayload = removeUndefined(payload as Record<string, unknown>);
    await addDoc(collection(db, path), {
      ...cleanedPayload,
      createdAt: serverTimestamp(),
    });
  };

  const updateDocument = async (id: string, payload: Partial<T>) => {
    const cleanedPayload = removeUndefined(payload as Record<string, unknown>);
    await updateDoc(doc(db, path, id), {
      ...cleanedPayload,
      updatedAt: serverTimestamp(),
    });
  };

  const deleteDocumentById = async (id: string) => {
    await deleteDoc(doc(db, path, id));
  };

  return {
    data,
    loading,
    error,
    addDocument,
    updateDocument,
    deleteDocument: deleteDocumentById,
  };
}
