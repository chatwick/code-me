import React from 'react'
interface availableUser
{
  status: boolean,
  uid: string,
  user: object,
}

const UserAccount = ({ status, uid, user }: availableUser) =>
{
  
  return (
    <div>UserAccount</div>
  )
}

export default UserAccount