import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

// TODO: Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCezkC1UDda81W81BoZEtdLeIRGVzFVmyw",
  authDomain: "crossword-bac37.firebaseapp.com",
  databaseURL: "https://crossword-bac37-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "crossword-bac37",
  storageBucket: "crossword-bac37.firebasestorage.app",
  messagingSenderId: "782981029418",
  appId: "1:782981029418:web:89ce31a3fa4869466cad53"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const storage = getStorage(app);

