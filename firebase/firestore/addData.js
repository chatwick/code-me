import firebase_app from "../config";
import { getFirestore, collection, serverTimestamp, setDoc, updateDoc, doc } from "firebase/firestore";

const db = getFirestore(firebase_app)

export default async function addData(data) {

    const docRef = await setDoc(collection(db, "discussion"), data)

      await updateDoc(doc(docRef), {
        updatedAt: serverTimestamp()
    });
}