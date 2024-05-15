import * as FirebaseApp from 'firebase/app'
import * as FirebaseAuth from 'firebase/auth'

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyClle_5VZwpSmyqAyvk9YQj7D719fC_ba8",
  authDomain: "barbearia-429f7.firebaseapp.com",
  projectId: "barbearia-429f7",
  storageBucket: "barbearia-429f7.appspot.com",
  messagingSenderId: "1010822759918",
  appId: "1:1010822759918:web:847ddf7c95ee4f3409faff"
};

// const FIREBASE_CONFIG = {
//   apiKey: process.env.REACT_APP_apiKey,
//   authDomain: process.env.REACT_APP_authDomain,
//   projectId: process.env.REACT_APP_projectId,
//   storageBucket: process.env.REACT_APP_storageBucket,
//   messagingSenderId: process.env.REACT_APP_messagingSenderId,
//   appId: process.env.REACT_APP_appId
// };

const FIREBASE_APP = FirebaseApp.initializeApp(FIREBASE_CONFIG)

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