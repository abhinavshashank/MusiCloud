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
              <Route path="/" element={<Signup/>}/>
              <Route path="/home" element={<Home/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
            </Routes>
        </section>
      </div>
    </Router>
  );
}
 
export default App;