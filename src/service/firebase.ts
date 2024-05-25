import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyAVnRy_bYfmpYjZDAqmUyYR-rdg0QnxN70',
  authDomain: 'agenda-e8314.firebaseapp.com',
  databaseURL: 'https://agenda-e8314-default-rtdb.firebaseio.com',
  projectId: 'agenda-e8314',
  storageBucket: 'agenda-e8314.appspot.com',
  messagingSenderId: '608053365273',
  appId: '1:608053365273:web:ff65d11a902b1a5a70b888',
  measurementId: 'G-XM6ZHNPNN9',
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const database = getDatabase(app)

export { app, auth, database }
