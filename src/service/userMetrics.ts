import { db } from "../service/firebase";
import { doc, updateDoc, increment } from "firebase/firestore";

export async function updateUserMetric(
  userEmail: string,
  field: "followers" | "following" | "likes" | "posts",
  incrementBy: number
): Promise<void> {
  try {
    const userRef = doc(db, "users", userEmail);
    await updateDoc(userRef, {
      [field]: increment(incrementBy)
    });
  } catch (error) {
    console.error(`Error al actualizar el campo ${field}:`, error);
  }
}