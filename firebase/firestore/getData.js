import firebase_app from "../config";
import { getFirestore, collection, doc, addDoc, updateDoc, serverTimestamp, getDocs } from "firebase/firestore";
import MessageCard from "@/app/components/MessageCard";

const db = getFirestore(firebase_app)

export default async function getData() {
console.log("This is get Data")
const querySnapshot = await getDocs(collection(db, "discussion"));
querySnapshot.forEach((doc) => {
    //const msgs = doc.data()
    <MessageCard {...doc.data()}/>
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});
}