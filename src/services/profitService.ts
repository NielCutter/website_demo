import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { ProfitCalculation, SortField, SortOrder } from "../types/profit";

const COLLECTION_NAME = "profitCalculations";

/**
 * Save a new profit calculation
 */
export async function saveProfitCalculation(
  calculation: Omit<ProfitCalculation, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...calculation,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving profit calculation:", error);
    throw error;
  }
}

/**
 * Update an existing profit calculation
 */
export async function updateProfitCalculation(
  id: string,
  calculation: Partial<Omit<ProfitCalculation, "id" | "createdAt">>
): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...calculation,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating profit calculation:", error);
    throw error;
  }
}

/**
 * Delete a profit calculation
 */
export async function deleteProfitCalculation(id: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting profit calculation:", error);
    throw error;
  }
}

/**
 * Get all profit calculations for a user
 */
export async function getProfitCalculations(
  userId?: string,
  sortField: SortField = "date",
  sortOrder: SortOrder = "desc"
): Promise<ProfitCalculation[]> {
  try {
    let q = query(collection(db, COLLECTION_NAME));

    if (userId) {
      q = query(q, where("userId", "==", userId));
    }

    // Convert sortField to Firestore field name
    const firestoreField =
      sortField === "date"
        ? "createdAt"
        : sortField === "profitMargin"
        ? "results.profitMargin"
        : "itemName";

    q = query(
      q,
      orderBy(firestoreField, sortOrder === "asc" ? "asc" : "desc")
    );

    const querySnapshot = await getDocs(q);
    const calculations: ProfitCalculation[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      calculations.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as ProfitCalculation);
    });

    return calculations;
  } catch (error) {
    console.error("Error fetching profit calculations:", error);
    throw error;
  }
}

/**
 * Get a single profit calculation by ID
 */
export async function getProfitCalculationById(
  id: string
): Promise<ProfitCalculation | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }

    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    } as ProfitCalculation;
  } catch (error) {
    console.error("Error fetching profit calculation:", error);
    throw error;
  }
}

