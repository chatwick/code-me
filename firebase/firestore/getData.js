import firebase_app from "../config";
import { getFirestore, collection, doc, addDoc, updateDoc, serverTimestamp, getDocs } from "firebase/firestore";
import MessageCard from "@/app/components/MessageCard";

const db = getFirestore(firebase_app)

export default async function getData() {
const messages = [];
const querySnapshot = await getDocs(collection(db, "discussion"));
querySnapshot.forEach((doc) => {
  messages.push(doc.data())
  //console.log(doc.id, " => ", doc.data());
});
return messages
}