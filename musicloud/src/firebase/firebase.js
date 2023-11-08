import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; 
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyCZokZIZwoswl7eyGULGi3b1CLqBpv7dNc",
  authDomain: "musicloud-1d821.firebaseapp.com",
  projectId: "musicloud-1d821",
  storageBucket: "musicloud-1d821.appspot.com",
  messagingSenderId: "771389806298",
  appId: "1:771389806298:web:6e7f123ad34b2343dab7e3",
  measurementId: "G-M1WK0EC1TW",
  databaseURL: "https://musicloud-1d821-default-rtdb.firebaseio.com/"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getDatabase(app); 

export { auth, storage, db, ref, uploadBytes, getDownloadURL };