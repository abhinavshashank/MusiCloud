import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, query, orderByChild, limitToLast, get, update } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';



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
const db = getDatabase(app);
const storage = getStorage(app);


export const updateLikes = (songId, newLikes) => {
  const songRef = ref(db, `songs/${songId}`);


  update(songRef, { likes: newLikes });
};



export {
  auth,
  storage,
  db,
  storageRef,
  uploadBytes,
  getDownloadURL,
  ref,
  query,
  orderByChild,
  limitToLast,
  get
};