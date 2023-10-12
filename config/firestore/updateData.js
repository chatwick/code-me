import firebase_app from "../firebase_config";
import { getFirestore, collection, serverTimestamp, setDoc, updateDoc, doc } from "firebase/firestore";

const db = getFirestore(firebase_app)

export default async function updateData(id,data) {

    const docRef = doc(db, "discussion", id)
    setDoc(docRef,{message: data}, {merge: true})

    const updateTimestamp = await updateDoc(docRef, {
        timestamp: serverTimestamp(),
        updatedDate: new Date().toDateString(),
        updatedTime: new Date().toLocaleTimeString(),
        edited: true
    });
}