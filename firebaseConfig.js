import { initializeApp } from 'firebase/app';
 import { getFirestore } from 'firebase/firestore';
 
 const firebaseConfig = {
   apiKey: "AIzaSyD0BvPy_CGuxVwMO3olzBvHd-xT3xl46dk",
   authDomain: "trial-e5981.firebaseapp.com",
   projectId: "trial-e5981",
   storageBucket: "trial-e5981.firebasestorage.com",
   messagingSenderId: "YOUR_MSG_ID",
   appId: "1:108877922792:android:05a9b0266bd0b65683a45d"
 };
 
 const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);
 
 export { db };