import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyClle_5VZwpSmyqAyvk9YQj7D719fC_ba8",
  authDomain: "barbearia-429f7.firebaseapp.com",
  projectId: "barbearia-429f7",
  storageBucket: "barbearia-429f7.appspot.com",
  messagingSenderId: "1010822759918",
  appId: "1:1010822759918:web:847ddf7c95ee4f3409faff"
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const database = getDatabase(app)

export { app, auth, database }
