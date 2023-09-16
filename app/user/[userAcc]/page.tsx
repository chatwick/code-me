"use client"

import { getCurrentUser, signOutUser } from '@/app/utility/dbFunctions'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { userParams } from '@/app/utility/interfaces'
import { UserContext } from '@/app/contexts/UserContext'
import { availableUser } from '@/app/utility/interfaces'
import useUserStore from '@/app/contexts/userStore'

// initializing params hoook
const UserAccount = ({ params }: userParams) =>
{
  // url parameters
  // const params = useParams();
  const id = params.userAcc
  const [user, setUser] = useState<availableUser | null>()

  const userAcc: any = useUserStore((state) => state.user);

  // routerhook
  const router = useRouter();
  // contexts
  const userC = useContext(UserContext);

  // useEffect(() =>
  // {
  //   const loadUser = async () =>
  //   {
  //     try
  //     {
  //       const result = await getCurrentUser();
  //       if (result.status)
  //       {
  //         setUser(result.user)
  //       }
  //     } catch (error)
  //     {

  //     }
  //   }

  // }, [])



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
      <div>UserAccount of {id}</div>
      <div>
        {userAcc.email}
      </div>
      <button className='btn btn-primary' onClick={handleSignOut}>Signout</button>
    </>
  )
}

export default UserAccount