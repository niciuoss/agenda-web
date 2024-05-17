import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import * as FirebaseAuth from 'firebase/auth'
import { child, get, getDatabase, push, ref } from 'firebase/database'
import { createContext, ReactNode, useEffect, useState } from 'react'

import { app, auth } from '../service/firebase'

type CreateUserType = {
  displayName?: string
  email: string
  password: string
}

type CreateUserAdmin = {
  displayName?: string
  email: string
  password: string
  address: string
}

type CurrenteUser = {
  uid: string
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
  signUpAdmin: (data: CreateUserAdmin) => Promise<void>
  signIn: (
    email: string,
    password: string,
    typeUser: string,
  ) => Promise<FirebaseAuth.UserCredential>
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

  async function signIn(email: string, password: string, typeUser: string) {
    const result = await FirebaseAuth.signInWithEmailAndPassword(
      FirebaseAuth.getAuth(app),
      email,
      password,
    )
    const { uid } = result.user
    const db = ref(getDatabase(app))

    const urlDB: string =
      typeUser === 'client' ? `users/${uid}` : `establishments/${uid}`
    await get(child(db, urlDB))
      .then((resp) => {
        if (resp.exists()) {
          const userData = Object.values(resp.val())[0]
          const data = {
            uid,
            displayName: userData.displayName,
            email: userData.email,
            role: userData.role,
          }
          setUser(data)
        } else {
          console.log('🚀 ~ No data available')
        }
      })
      .catch((err) => {
        console.log('🚀 ~ signIn ~ err:', err)
      })

    return result
  }

  async function signUp({ displayName, email, password }: CreateUserType) {
    try {
      const result = await FirebaseAuth.createUserWithEmailAndPassword(
        FirebaseAuth.getAuth(),
        email,
        password,
      )

      if (!result.user) {
        throw new Error('Erro ao cadastrar')
      }

      const { uid } = result.user

      const db = getDatabase(app)
      await push(ref(db, 'users/' + uid), {
        displayName,
        email,
        role: 'client',
      })
        .then((resp) => {
          return resp
        })
        .catch(() => {
          return null
        })
    } catch (error) {
      console.log('🚀 ~ AuthContextProvider ~ error:', error)
    }
  }

  async function signUpAdmin({
    displayName,
    email,
    password,
    address,
  }: CreateUserAdmin) {
    try {
      const result = await FirebaseAuth.createUserWithEmailAndPassword(
        FirebaseAuth.getAuth(),
        email,
        password,
      )
      const { uid } = result.user

      const db = getDatabase(app)
      await push(ref(db, 'establishments/' + uid), {
        displayName,
        email,
        role: 'admin',
        address,
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
      value={{
        user,
        signInWithGoogle,
        signIn,
        signUp,
        signUpAdmin,
        resetPassword,
        signOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
