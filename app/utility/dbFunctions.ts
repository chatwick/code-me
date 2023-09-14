import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { app,auth, firestore } from '@/config/firebase_config'
import { log } from 'console'
import React, {FunctionComponent} from 'react'


// consts



// interfaces
interface existingUserProps {
    email: string,
    password: string
}

interface newUserProps {
    email: string,
    password: string,
    username: string
}

// const auth = getAuth();
 
// const existingUser: FunctionComponent<existingUserProps> = () => {
//     return (  );
// }


/**
 * 
 * @param newUser - user object to be sent to firebase
 * @returns nothing for now
 */
export const registerUser = async (newUser: newUserProps) => {
    const {email, password} = newUser;

    createUserWithEmailAndPassword(auth, email, password )
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);

            return {
                status: true,
                message: "Successfully created user"
            }
        
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            return {
                status: false,
                message: `Encountered an error during registration. Error code: ${errorCode}`
            }

          });
  }

 
export default registerUser;






