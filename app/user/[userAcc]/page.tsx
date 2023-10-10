"use client"

import { getCurrentUser, signOutUser, updateUserEmail } from '@/app/utility/dbFunctions'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { userParams } from '@/app/utility/interfaces'
import { UserContext } from '@/app/contexts/UserContext'
import { availableUser } from '@/app/utility/interfaces'
import useUserStore from '@/app/contexts/userStore'
import { useForm } from 'react-hook-form'


// initializing params hoook
const UserAccount = ({ params }: userParams) =>
{
  // url parameters
  // const params = useParams();
  const id = params.userAcc
  let userAcc: any = {}
  const [user, setUser] = useState<any | null>()
// useEffect(() => {
//   userAcc = useUserStore((state) => state.user);
// })

  // routerhook
  const router = useRouter();
  // contexts
  const userC = useContext(UserContext);
  // form attributes
  const {register, handleSubmit} = useForm({
    defaultValues: {
        email: "",
        password: ""
    }
});

  useEffect(() =>
  {
    const loadUser = async () =>
    {
      try
      {
        const result = await getCurrentUser();
        if (result.status)
        {
          setUser(result.user)
        }
      } catch (error)
      {

      }
    }
    loadUser()
  }, [])

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

  /**
   * @remark Updates email and password
   */
  const handleUpdate = async () =>{
    const status = await updateUserEmail("");
    if(status){
      console.log("Update successful");
    }else
    {
      console.log("Error updating email");
    }
  }

  return (
    <>
      <div>UserAccount of {id}</div>
      <div className="flex justify-center">
        <div className='card card-bordered border-white lg:w-3/5 lg:h-2/5 bg-base-100 shadow-xl my-20'>
          {user?.email? user.email : 'loading...'}
          <div className="">
          <form className='flex flex-col justify-center items-center my-5' onSubmit={handleSubmit(handleUpdate)}>
            <input className='input input-bordered' {...register("email", { required: "Please enter an email" })} placeholder={"temp"} />
            <button className="btn btn-primary w-40">Update</button>
            </form>
          </div>
        </div>
      </div>
      <button className='btn btn-primary' onClick={handleSignOut}>Signout</button>
    </>
  )
}

export default UserAccount