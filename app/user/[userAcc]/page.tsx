"use client"

import { deleteUserAccount, getCurrentUser, signOutUser, updateUserEmail, updateUserPass } from '@/app/utility/dbFunctions'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { userParams } from '@/app/utility/interfaces'
import { UserContext } from '@/app/contexts/UserContext'
import { availableUser } from '@/app/utility/interfaces'
import useUserStore from '@/app/contexts/userStore'
import { useForm } from 'react-hook-form'
import { Alert } from '@/app/components/Alert'


// initializing params hoook
const UserAccount = ({ params }: userParams) =>
{
  // url parameters
  // const params = useParams();
  const id = params.userAcc
  let userAcc: any = {}
  const [user, setUser] = useState<any | null>()

  // states
  const [showAlert, setShowAlert] = useState(false)

  // routerhook
  const router = useRouter();
  // contexts
  const userC = useContext(UserContext);
  // form attributes
  const { register, handleSubmit } = useForm({
    defaultValues: {
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
   * Calls the delete function
   */
  const handleDelete = async () =>
  {
    const result = await deleteUserAccount();
    if (result.status)
    {
      router.push('/user/signin')
    } else
    {
      router.push('/')
    }
  }

  /**
   * @remark Updates email and password
   */
  const handleUpdate = async (data: any) =>
  {
    // const status = await updateUserEmail("");
    const passStatus = await updateUserPass(data);
    if (passStatus?.status)
    {
      setShowAlert(true)
      console.log('called error login part');

      setTimeout(() =>
      {
        setShowAlert(false)
      }, 8000);
      console.log("Password Update successful");
    } else
    {
      console.log("Error updating password");
    }
  }

  return (
    <>
      {showAlert && <Alert message={'Password update successful'} type={'success'} />}
      <div className="flex justify-center">
        <div className='card card-bordered border-white lg:w-2/5 lg:h-2/5 bg-base-100 shadow-xl my-20'>
          <div className="flex flex-col justify-center items-center mt-10 text-2xl">
            {user?.email ? `Welcome to your profile ${user.email}` : 'Loading...'}
            <p className='text-base mt-10'>You may change your password here</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <form className='flex flex-col justify-center items-center my-5' onSubmit={handleSubmit(handleUpdate)}>
              <input className='input input-bordered' type="password" {...register("password", {
                required: "Please enter a password", minLength: {
                  value: 8,
                  message: "Password should be 8 characters long minimum"
                }
              })} placeholder={"new password"} />
              <button className="btn btn-primary w-40 mt-10">Update</button>
            </form>
            <button className='btn btn-primary w-40' onClick={handleSignOut}>Signout</button>
            <button className='btn btn-ghost border-white w-40 my-5' onClick={handleDelete}>Delete Account</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserAccount