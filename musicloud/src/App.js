import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PlaylistProvider } from './components/PlaylistContext';
import Home from './components/home';
import Signup from './components/signup';
import Login from './components/login';
import UploadSong from './components/UploadSong';
import Search from './components/search';
import MySongs from './components/mysongs';
import { getAuth, onAuthStateChanged  } from 'firebase/auth';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const auth = getAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(!!auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, [auth]);
  return (
    <Router>
      <PlaylistProvider>
        <Routes>
          <Route
            path="/"
            element={<Login setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={<PrivateRoute element={<MySongs />} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/upload"
            element={<PrivateRoute element={<UploadSong />} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/search"
            element={<PrivateRoute element={<Search />} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/my-songs"
            element={<PrivateRoute element={<MySongs />} isAuthenticated={isAuthenticated} />}
          />
          {/* Add a catch-all or 404 route if needed */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </PlaylistProvider>
    </Router>
  );
}

export default App;

