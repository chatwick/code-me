import firebase_app from "../config";
import { getFirestore, collection, doc, addDoc, updateDoc, serverTimestamp, getDocs, query, orderBy } from "firebase/firestore";
import MessageCard from "@/app/components/MessageCard";

const db = getFirestore(firebase_app)

export default async function getData() {
const messages = [];
const q = query(collection(db, "discussion"),orderBy("timestamp"))
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  messages.push(doc.data())
  //console.log(doc.id, " => ", doc.data());
});
return messages
}