import { initializeApp } from "firebase/app"
import  { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { ref as firebaseRef, getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCWZQ2-jSGWhRjLJGqro99u4UhrbH92fUg",
  authDomain: "tasty-talks.firebaseapp.com",
  projectId: "tasty-talks",
  storageBucket: "gs://tasty-talks.appspot.com",
  messagingSenderId: "706824539285",
  appId: "1:706824539285:web:d681ff9d12acda7b955f9c"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app) // User authentication
const db = getFirestore(app) // Database

// Image storage constants and references
const storage = getStorage(app)
const questionPicsRef = firebaseRef(storage, 'images/questionPics')
const recipePicsRef = firebaseRef(storage, 'images/recipePics')
const userPicsRef = firebaseRef(storage, 'images/userPics')

export { auth, db, questionPicsRef, recipePicsRef, userPicsRef, firebaseRef, storage }