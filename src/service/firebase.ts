import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// import * as FirebaseApp from 'firebase/app'
import * as FirebaseAuth from 'firebase/auth'


const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
}

const app = initializeApp(firebaseConfig)

export function signIn(email: string, password: string){
  return FirebaseAuth.signInWithEmailAndPassword(
    FirebaseAuth.getAuth(),
    email,
    password
  )
}

export function signUp(email: string, password: string){
  return FirebaseAuth.createUserWithEmailAndPassword(
    FirebaseAuth.getAuth(),
    email,
    password
  )
}

export function resetPassword(email: string){
  return FirebaseAuth.sendPasswordResetEmail(
    FirebaseAuth.getAuth(),
    email
  )
}

export const auth = getAuth(app)
