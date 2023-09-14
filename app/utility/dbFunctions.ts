import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, firestore } from "@/config/firebase_config";
import { log } from "console";
import React, { FunctionComponent } from "react";
import { promises } from "dns";

// consts

// interfaces
interface existingUserProps {
  email: string;
  password: string;
}

interface newUserProps {
  email: string;
  password: string;
  username: string;
}

// const auth = getAuth();

// const existingUser: FunctionComponent<existingUserProps> = () => {
//     return (  );
// }

/**
 *
 * @param newUser - user object to be sent to firebase
 * @returns Status object with status and message
 */
export const registerUser = async (newUser: newUserProps) => {
  const { email, password } = newUser;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Successfully created account");
      console.log(user);

      return {
        status: true,
        message: "Successfully created user",
      };
    })
    // await updateProfile(auth.currentUser, displayName: )
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      return {
        status: false,
        message: `Encountered an error during registration. Error code: ${errorCode}`,
      };
    });
};

/**
 *
 * @param user - User objet to be logged in
 * @returns Status object with status and message
 */
export const loginUser = async (user: existingUserProps) => {
  const { email, password } = user;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("Successfully logged in");
      console.log(user);

      return {
        status: true,
        message: "Successfully logged in user",
      };
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      return {
        status: false,
        message: `Encountered an error during login process. Error code: ${errorCode}`,
      };
    });

  return;
};

/**
 * Signs out current user when called
 * @returns Status object with status and message
 */
export const signOutUser = async () => {
  try {
    const result = await signOut(auth);
    console.log("Successfully signed out user");
    return { status: true, message: "Successfully signed out the user" };
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

/**
 * This function returns the currently signed in user when called
 * @returns user object
 */
export const getCurrentUser = async() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          console.log(`User ID of current user is: ${uid}`);
          console.log(user);
          
          
          return {status: true, uid, user}
        } else {
          // User is signed out
          return {status: false}
        }
      }); 
}

