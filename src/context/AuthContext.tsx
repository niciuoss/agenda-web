import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, app } from "../service/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import * as FirebaseAuth from 'firebase/auth';


type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider()

    const result: any = await signInWithPopup(auth, provider).then((result) => {
      console.log('result', result)
    })

    // if (result.user) {
    //   const { displayName, photoURL, uid } = result.user

    //   if (!displayName || !photoURL) {
    //     throw new Error('Missing information from Google Account.');
    //   }

      // setUser({
      //   id: uid,
      //   name: displayName,
      //   avatar: photoURL
      // })
      //}
  }

  async function signIn(email: string, password: string){
    FirebaseAuth.signInWithEmailAndPassword(
      FirebaseAuth.getAuth(app),
      email,
      password
    )
      console.log('result')
  }

  async function signUp(email: string, password: string){
    FirebaseAuth.createUserWithEmailAndPassword(
      FirebaseAuth.getAuth(),
      email,
      password
    ).then((result) => {
      console.log('result', result)
      
    })
  }
  
  async function resetPassword(email: string){
    FirebaseAuth.sendPasswordResetEmail(
      FirebaseAuth.getAuth(),
      email
    )
  }
  
  async function signOut(){
    setUser(undefined)
    FirebaseAuth.signOut(
      FirebaseAuth.getAuth()
    )
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signIn, signUp, resetPassword, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}