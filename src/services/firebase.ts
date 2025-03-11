import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcei3x4cgm5d3Jz82EMfwrGi4BCH8MfA4",
  authDomain: "book-club-poll.firebaseapp.com",
  databaseURL: "https://book-club-poll-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "book-club-poll",
  storageBucket: "book-club-poll.firebasestorage.app",
  messagingSenderId: "635539352323",
  appId: "1:635539352323:web:a0ba9d26b229d884a71736"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }; 