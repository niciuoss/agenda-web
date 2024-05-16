import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import * as FirebaseAuth from 'firebase/auth'
import { child, get, getDatabase, push, ref } from 'firebase/database'
import { createContext, ReactNode, useEffect, useState } from 'react'

import { app, auth } from '../service/firebase'

type CreateUserType = {
  displayName: string
  email: string
  password: string
  role: string
}

type CurrenteUser = {
  displayName: string | null
  email: string | null
  role?: string
}

type AuthContextType = {
  user: CurrenteUser | null
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  signUp: (data: CreateUserType) => Promise<void>
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
  const [user, setUser] = useState<CurrenteUser | null>(null)
  console.log('🚀 ~ AuthContextProvider ~ user:', user)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const data = {
          displayName: authUser.displayName,
          email: authUser.email,
        }
        setUser(data)
      } else {
        setUser(null)
      }
    })
    return () => unsubscribe()
  }, [])

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider).then((result) => {
      if (result.user) {
        const { displayName, photoURL } = result.user

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
    const { uid } = result.user
    const db = ref(getDatabase(app))
    get(child(db, `users/${uid}`))
      .then((resp) => {
        console.log('🚀 ~ signIn ~ userDB:', resp.val())
        const data = {
          displayName: resp.val()[uid].username,
          email: resp.val()[uid].email,
          role: resp.val()[uid].role,
        }
        setUser(data)
      })
      .catch((err) => {
        console.log('🚀 ~ signIn ~ err:', err)
      })

    return result
  }

  async function signUp({
    displayName,
    email,
    password,
    role = 'admin',
  }: CreateUserType) {
    try {
      const result = await FirebaseAuth.createUserWithEmailAndPassword(
        FirebaseAuth.getAuth(),
        email,
        password,
      )
      const { uid } = result.user

      const db = getDatabase(app)
      await push(ref(db, 'users/' + uid), {
        username: displayName,
        email,
        role,
      }).then((resp) => console.log('🚀 ~ user:', resp))
    } catch (error) {
      console.log('🚀 ~ AuthContextProvider ~ error:', error)
    }
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
