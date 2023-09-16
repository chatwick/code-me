"use client"

import { signOutUser } from '@/app/utility/dbFunctions'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

// interfaces
interface availableUser
{
  status: boolean,
  uid: string,
  user: object,
}




// initializing params hoook
const UserAccount = ({ status, uid, user }: availableUser) =>
{
  // url parameters
  const params = useParams();
  const id = params.userAcc

  // routerhook
  const router = useRouter();

  /**
   * @remark Signs out user when clicked
   */
  const handleSignOut = async () =>
  {
    const result: { status: boolean, message: string } | undefined = await signOutUser();
    if (result?.status)
    {
      router.push('/')
    } else
    {
      console.log("Error signing out user");

    }
  }

  return (
    <>
      <div>UserAccount {id}</div>

      <button className='btn btn-primary' onClick={handleSignOut}>Signout</button>
    </>
  )
}

export default UserAccount