// Home.js
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';
import Layout from './Layout';
import { usePlaylist } from './PlaylistContext'; // Import the context hook

const Home = () => {

  const { addToPlaylist, playlist } = usePlaylist(); // Use the context hook

  const navigate = useNavigate();

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

  console.log('Rendering Home component...');

  return (
    <Layout
    mainContent={
        <div className="main_content">
          <div className="playlist-container">
            <h2>Playlist Queue</h2>
            <ul>
              {playlist.map((song, index) => (
                <li key={index}>
                  <span>{song.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
    }
    />
        
    );
};

export default Home;
