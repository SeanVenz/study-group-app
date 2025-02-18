import { initializeApp } from 'firebase/app';
import { getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCkrxQG5p3DOUzIGxmHr0C1gKaTtktNZBg",
  authDomain: "study-group-app-47239.firebaseapp.com",
  projectId: "study-group-app-47239",
  storageBucket: "study-group-app-47239.firebasestorage.app",
  messagingSenderId: "747933701341",
  appId: "1:747933701341:web:f3f2f249995abea1e13734",
  measurementId: "G-FRW21XG9HB"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
