import React, { useState, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useNavigate, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, updateLikes } from '../firebase/firebase';
import { usePlaylist } from './PlaylistContext';
import './layout.css';

const Layout = ({ mainContent, isPlaying, currentSong, playlist, isAuthenticated }) => {
  const navigate = useNavigate();
  const { setPlaylist } = usePlaylist();

  console.log('Layout - Rendering with currentSong:', currentSong);
  console.log('Layout - isPlaying:', isPlaying);
  console.log('Layout - playlist:', playlist);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
        console.log('Signed out successfully');
      })
      .catch((error) => {
        // Handle sign-out error
      });
  };

  
  console.log('Layout - Rendering...');
  return (
    <div className="container">
      <div className="sidebar">
        <div>
          <Link to="/home">
            <img src="musicloud-color-logo.svg" alt="MusiCloud Logo" />
          </Link>
        </div>
        <div style={{ fontSize: 18, color: 'white', marginTop: 30 }}>
          <Link to="/upload">Upload Song</Link>
        </div>
        <div style={{ fontSize: 18, color: 'white', marginTop: 50 }}>
          <Link to="/search">Search Song</Link>
        </div>
        <div style={{ fontSize: 18, color: 'white', marginTop: 50 }}>
          <Link to="/my-songs">My Songs</Link>
        </div>
        <div>
            <footer>

            <button
            type="button"
            onClick={handleLogout}
            style={{ fontSize: 18, backgroundColor: 'purple', color: 'white', marginTop: 75 }}
            >
            <Link to="/" onClick={handleLogout}>
              Sign Out
            </Link>
          </button>

            </footer>
          
        </div>
      </div>
      <div className="main_content">{mainContent}</div>
      </div>
  );
};

export default Layout;
