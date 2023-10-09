// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase/compat/app'; // Import Firebase app
import 'firebase/compat/auth'; // Import Firebase Authentication

// Your Firebase configuration
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
firebase.initializeApp(firebaseConfig);

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);