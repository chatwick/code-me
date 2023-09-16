import React from 'react'
import { create } from 'zustand'
import { getCurrentUser } from '../utility/dbFunctions'

type Store = {
    user: object | null
    setUser: any
  }

const useUserStore = create<Store>((set)=> ({
    user: null,
    setUser: (user:any) => set({user}),
}))

export default useUserStore;



