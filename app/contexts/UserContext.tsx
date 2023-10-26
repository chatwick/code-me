"use client"

import React, {useContext,useState} from 'react'

const UserContext = React.createContext(null)

export const useUser = () => {
  return useContext(UserContext);
};

const UserContextProvider = ({ children}: any) =>
{
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={user}>{children}</UserContext.Provider>
  )
};

export { UserContextProvider, UserContext };
