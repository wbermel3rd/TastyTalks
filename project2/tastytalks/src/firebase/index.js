
import { initializeApp } from "firebase/app"
import  { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCWZQ2-jSGWhRjLJGqro99u4UhrbH92fUg",
  authDomain: "tasty-talks.firebaseapp.com",
  projectId: "tasty-talks",
  storageBucket: "tasty-talks.appspot.com",
  messagingSenderId: "706824539285",
  appId: "1:706824539285:web:d681ff9d12acda7b955f9c"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export { auth }
