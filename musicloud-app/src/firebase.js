// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZokZIZwoswl7eyGULGi3b1CLqBpv7dNc",
  authDomain: "musicloud-1d821.firebaseapp.com",
  projectId: "musicloud-1d821",
  storageBucket: "musicloud-1d821.appspot.com",
  messagingSenderId: "771389806298",
  appId: "1:771389806298:web:6e7f123ad34b2343dab7e3",
  measurementId: "G-M1WK0EC1TW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);