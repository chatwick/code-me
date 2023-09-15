import firebase_app from "../config";
import { getFirestore, collection, serverTimestamp, addDoc, updateDoc, doc } from "firebase/firestore";

const db = getFirestore(firebase_app)

export default async function addData(data) {

    const docRef = await addDoc(collection(db, "discussion"), data)

    const updateTimestamp = await updateDoc(docRef, {
      timestamp: serverTimestamp(),
      updatedDate: new Date().toDateString(),
      updatedTime: new Date().toLocaleTimeString()
  });
}