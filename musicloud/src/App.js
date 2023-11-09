import React, {useState, useEffect} from 'react';
import Home from './components/home';
import Signup from './components/signup';
import Login from './components/login';
import UploadSong from './components/UploadSong'; 
import Search from './components/search';
import MySongs from './components/mysongs';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
 
function App() {
 
  return (
    <Router>
      <div>
        <section>
            <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/home" element={<Home/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/upload" element={<UploadSong/>}/>
              <Route path="/search" element={<Search/>}/>
              <Route path="/my-songs" element={<MySongs/>}/>
            </Routes>
        </section>
      </div>
    </Router>
  );
}
 
export default App;