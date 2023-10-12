import firebase_app from "../firebase_config";
import { getFirestore, collection, doc, getDoc} from "firebase/firestore";

const db = getFirestore(firebase_app)

export default async function getDataId(docId) {

const docRef = doc(db,"discussion",docId)
const querySnapshot = await getDoc(docRef);
if(querySnapshot.exists()){
    return querySnapshot.data()
}
else{
    console.log("No such document")
}
}