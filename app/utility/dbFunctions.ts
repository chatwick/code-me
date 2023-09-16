import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth, firestore } from "@/config/firebase_config";
import { log } from "console";
import React, { FunctionComponent, useState } from "react";
import { promises } from "dns";
import { signOutReturn } from "./interfaces";

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

interface availableUser {
  status: boolean;
  uid?: string;
  user?: object;
}

/**
 *
 * @param newUser - user object to be sent to firebase
 * @returns Status object with status and message
 */
export const registerUser = async (newUser: newUserProps) => {
  const { email, password } = newUser;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("Successfully created account");
    console.log(user);

    return {
      status: true,
      message: "Successfully created account",
    };
  } catch (error) {
    // await updateProfile(auth.currentUser, displayName: )
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      status: false,
      message: `Encountered an error during registration: ${errorMessage}`,
    };
  }
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
export const getCurrentUser = async (): Promise<availableUser> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(`User ID of current user is: ${uid}`);
        // return an object with user availability status, uid, user object
        resolve({ status: true, uid, user });
      } else {
        // User is signed out
        resolve({ status: false });
      }
      unsubscribe();
    });
  });
};

/**
 * returns the user object of a given uid
 */
export const getUser = () => {};

// /**
//  * This function returns the currently signed in user when called
//  * @returns user object
//  */
// export const getCurrentUser = async (): Promise<object> => {

//   const result = await onAuthStateChanged(auth, (user) => {
//     if (user) {
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/auth.user
//       const uid = user.uid;
//       console.log(`User ID of current user is: ${uid}`);
//       console.log(user);
//       console.log({ status: true, uid, user });

//       return { status: true, uid, user };
//     } else {
//       // User is signed out
//       return { status: false };
//     }
//   });
//   return result;

// };

// /**
//  *
//  * @param newUser - user object to be sent to firebase
//  * @returns Status object with status and message
//  */
// export const registerUser = async (newUser: newUserProps) => {
//   const { email, password } = newUser;

//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       console.log("Successfully created account");
//       console.log(user);

//       return {
//         status: true,
//         message: "Successfully created user",
//       };
//     })
//     // await updateProfile(auth.currentUser, displayName: )
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;

//       return {
//         status: false,
//         message: `Encountered an error during registration. Error code: ${errorCode}`,
//       };
//     });
// };
