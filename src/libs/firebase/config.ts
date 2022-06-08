// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCFdOBg0RLN0Wg9Gj2HGp1rGbq2oiWqCsE',
  authDomain: 'bikes-349af.firebaseapp.com',
  projectId: 'bikes-349af',
  storageBucket: 'bikes-349af.appspot.com',
  messagingSenderId: '365703563655',
  appId: '1:365703563655:web:b0e8cf37102c0cb767eb22',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
