// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate
// import Login from './components/login';
// import Home from './components/home';

// function App() {
//   const [user, setUser] = useState(null); // User state to track authentication

//   const handleLogin = (authenticatedUser) => {
//     setUser(authenticatedUser); // Set user when logged in
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={user ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />}
//         />
//         <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React, {useState, useEffect} from 'react';
import Home from './components/home';
import Signup from './components/signup';
import Login from './components/login';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
 
function App() {
 
  return (
    <Router>
      <div>
        <section>                              
            <Routes>
              <Route path="/" element={<Home/>}/>
               <Route path="/signup" element={<Signup/>}/>
               <Route path="/login" element={<Login/>}/>
            </Routes>                    
        </section>
      </div>
    </Router>
  );
}
 
export default App;