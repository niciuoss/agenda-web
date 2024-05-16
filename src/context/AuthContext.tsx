import {
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth'
import * as FirebaseAuth from 'firebase/auth'
import { createContext, ReactNode, useEffect, useState } from 'react'

import { app, auth } from '../service/firebase'

type AuthContextType = {
  displayName: ReactNode
  user: FirebaseAuth.User | null
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  signUp: (
    displayName: string,
    email: string,
    password: string,
  ) => Promise<void>
  signIn: (
    email: string,
    password: string,
  ) => Promise<FirebaseAuth.UserCredential>
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<FirebaseAuth.User | null>(null)

  useEffect(() => {
    console.log(user)

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser)
      } else {
        setUser(null)
      }
    })
    return () => unsubscribe()
  }, [])

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider).then((result) => {
      console.log('🚀 ~ signInWithPopup ~ result:', result)

      if (result.user) {
        const { displayName, photoURL, uid } = result.user

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.')
        }

        setUser(result.user)
        return result
      }
    })
  }

  async function signIn(email: string, password: string) {
    const result = await FirebaseAuth.signInWithEmailAndPassword(
      FirebaseAuth.getAuth(app),
      email,
      password,
    )
    console.log('🚀 ~ signIn ~ result:', result)

    return result
  }

  async function signUp(displayName: string, email: string, password: string) {
    FirebaseAuth.createUserWithEmailAndPassword(
      FirebaseAuth.getAuth(),
      email,
      password,
    ).then(async (resp) => {
      const res = await updateProfile(resp.user, {
        displayName,
      })
      console.log('🚀 ~ ).then ~ res:', res)
    })
  }

  async function resetPassword(email: string) {
    FirebaseAuth.sendPasswordResetEmail(FirebaseAuth.getAuth(), email)
  }

  async function signOut() {
    setUser(null)
    FirebaseAuth.signOut(FirebaseAuth.getAuth())
  }

  return (
    <AuthContext.Provider
      value={{ user, signInWithGoogle, signIn, signUp, resetPassword, signOut }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
