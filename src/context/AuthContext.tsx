'use client'
import * as FirebaseAuth from 'firebase/auth'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'

import { auth } from '../service/firebase'

type CurrenteUser = {
  uid: string
  displayName: string | null
  email: string | null
  role?: string
  photoURL?: string | null
}

type AuthContextType = {
  user: CurrenteUser | null
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  setUser: Dispatch<SetStateAction<CurrenteUser | null>>
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<CurrenteUser | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const data = {
          uid: authUser.uid,
          displayName: authUser.displayName,
          email: authUser.email,
          photoURL: authUser.photoURL,
        }
        setUser(data)
      } else {
        setUser(null)
      }
    })
    return () => unsubscribe()
  }, [])

  async function resetPassword(email: string) {
    FirebaseAuth.sendPasswordResetEmail(FirebaseAuth.getAuth(), email)
  }

  async function signOut() {
    setUser(null)
    FirebaseAuth.signOut(FirebaseAuth.getAuth())
  }

  return (
    <AuthContext.Provider
      value={{
        setUser,
        user,
        resetPassword,
        signOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
