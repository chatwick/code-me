import firebase_app from "../config";
import { getFirestore, collection, doc, addDoc, updateDoc, serverTimestamp } from "firebase/firestore";

const db = getFirestore(firebase_app)

export default async function addData(data) {

    const docRef = await addDoc(collection(db, "discussion"), {
        data
      });

      const updateTimestamp = await updateDoc(docRef, {
        updatedAt: serverTimestamp()
    });
}