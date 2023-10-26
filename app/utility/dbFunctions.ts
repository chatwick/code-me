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
import { updateEmail, updatePassword, deleteUser } from "firebase/auth";
import { reauthenticateWithCredential } from "firebase/auth";
import { loginUser as loginInterfaceProps } from "./interfaces";

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
 * @remark Note - Not a good way to structure the function. See registerUser for good structure
 */
export const loginUser = async (
  user: existingUserProps
): Promise<loginInterfaceProps> => {
  const { email, password } = user;
  return new Promise((resolve) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Successfully logged in");
        console.log(user);

        resolve({
          status: true,
          message: "Successfully logged in user",
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        resolve({
          status: false,
          message: `Encountered an error during login process. Error code: ${errorCode}`,
        });
      });
  });
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
 * Updates a email of a user
 */
export const updateUserEmail = async (newEmail: string) => {
  const { user }: any = await getCurrentUser();
  const cuser: any = auth.currentUser;
  try {
    await updateEmail(cuser, "abcUpdated@gmail.com");

    return { status: true };
  } catch (error) {
    console.error("Error Updating email:", error);
  }
};

/**
 * @remark Updates password
 */
export const updateUserPass = async (data: { password: string }) => {
  const { password } = data;
  const cuser: any = auth.currentUser;
  try {
    console.log(cuser);
    await updatePassword(cuser, password);
    return { status: true };
  } catch (error) {
    console.error("Error Updating password:", error);
    return { status: false };
  }
};

/**
 * @remark Deletes the user
 * @returns Status object with deletion result
 */
export const deleteUserAccount = async () => {
  const cuser: any = auth.currentUser;
  try {
    const result = await deleteUser(cuser);
    await signOutUser();
    console.log("Successfully deleted user account");

    return { status: true };
  } catch (error) {
    console.error("Error Deleting account:", error);
    return { status: false };
  }
};

/**
 * @remark Authenticate User
 * @remark This function is no longer working. Do not use this
 */
export const reauthenticateUser = async () => {
  const { user }: any = await getCurrentUser();
};

/**
 * returns the user object of a given uid
 */
export const getUserByID = async () => {};

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
