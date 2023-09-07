// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAe1od_jy8uzBASofkWfxL5qQxnpKXh9gw",
  authDomain: "code-me-601b0.firebaseapp.com",
  projectId: "code-me-601b0",
  storageBucket: "code-me-601b0.appspot.com",
  messagingSenderId: "779657892073",
  appId: "1:779657892073:web:4040cb0b1cf6ab3b68e078"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);