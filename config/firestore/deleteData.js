import firebase_app from "../firebase_config";
import { getFirestore, collection, doc, deleteDoc} from "firebase/firestore";

const db = getFirestore(firebase_app)

export default async function deleteData(docId) {

    await deleteDoc(doc(db, "discussion", docId));
    console.log(docId, "Deleted Successfully")

}