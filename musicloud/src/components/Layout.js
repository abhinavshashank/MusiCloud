// Layout.js
import React, { useState, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { updateLikes } from '../firebase/firebase';
import { usePlaylist } from './PlaylistContext';
import './layout.css';

const Layout = ({ mainContent, isPlaying, currentSong, playlist }) => {
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

    const [playlistQueue, setPlaylistQueue] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [likes, setLikes] = useState(currentSong?.likes || 0);
    const [isPlayingInternal, setIsPlayingInternal] = useState(false);
    const [isPlayingState, setIsPlaying] = useState(isPlaying);


    useEffect(() => {
        // Check if there is a current song and it should be playing
        if (currentSong && isPlayingInternal) {
          // Automatically start playing the current song
          setIsPlayingInternal(true);
        } else {
          // Pause the player if there is no current song or it shouldn't be playing
          setIsPlayingInternal(false);
        }
      }, [currentSong, isPlayingInternal]);
    
      const togglePlayPause = () => {
        if (currentSong) {
          const updatedPlaylist = [...playlist];
          const songIndex = updatedPlaylist.findIndex((song) => song.id === currentSong.id);
          if (songIndex !== -1) {
            updatedPlaylist[songIndex].isPlaying = !updatedPlaylist[songIndex].isPlaying;
            setPlaylist(updatedPlaylist);
            setIsPlaying(updatedPlaylist[songIndex].isPlaying);
          }
        } else {
          // Otherwise, toggle the global play/pause state
          setIsPlaying(!isPlaying);
        }
      };
      
      

    const playNext = () => {
        const nextIndex = (currentIndex + 1) % playlistQueue.length;
        setCurrentIndex(nextIndex);
        setCurrentSong(playlistQueue[nextIndex]);
        setIsPlaying(true);
        setLikes(playlistQueue[nextIndex]?.likes || 0);
    };

    const playPrevious = () => {
        const previousIndex = (currentIndex - 1 + playlistQueue.length) % playlistQueue.length;
        setCurrentIndex(previousIndex);
        setCurrentSong(playlistQueue[previousIndex]);
        setIsPlaying(true);
        setLikes(playlistQueue[previousIndex]?.likes || 0);
    };

    const handleLike = () => {
        if (currentSong) {
            const newLikes = (currentSong.likes || 0) + 1;
            updateLikes(currentSong.id, newLikes); // Replace with your actual update function
            setLikes(newLikes);
        }
    };

    const handleDislike = () => {
        if (currentSong) {
            const newLikes = Math.max(0, (currentSong.likes || 0) - 1);
            updateLikes(currentSong.id, newLikes); // Replace with your actual update function
            setLikes(newLikes);
        }
    };

    console.log('Layout - Rendering...');
    return (
        <div className="container">
            <div className="sidebar">
                <div>
                    <a href="/home">
                        <img src="musicloud-color-logo.svg" alt="MusiCloud Logo" />
                    </a>
                </div>
                <div>
                    <a href="/upload">Upload Song</a>
                </div>
                <div>
                    <a href="/search">Search Song</a>
                </div>
                <div>
                    <a href="/my-songs">My Songs</a>
                </div>
                <div>
                    <a href="#" onClick={handleLogout}>
                        Sign Out
                    </a>
                </div>
            </div>
            <div className="main_content">{mainContent}</div>
            <div className="now-playing-container">
                <footer>
                    <div id="player-controls">
                        <button
                            id="PrevButton"
                            onClick={playPrevious}
                            style={{ fontSize: 24, color: 'darkblue', marginRight: 10 }}
                        >
                            ⏮️
                        </button>
                        <ReactAudioPlayer
                            src={currentSong ? currentSong.audioUrl : ''}
                            autoPlay={true}
                            controls
                            onPlay={() => togglePlayPause()}  
                            onPause={() => togglePlayPause()}  
                        />
                        <button
                            id="NextButton"
                            onClick={playNext}
                            style={{ fontSize: 24, color: 'darkblue', marginLeft: 10 }}
                        >
                            ⏭️
                        </button>
                        <span id="like-container">
                            <button id="LikeButton" onClick={handleLike}>
                                Like
                            </button>
                            <span>{likes}</span>
                            <button id="DislikeButton" onClick={handleDislike}>
                                Dislike
                            </button>
                        </span>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Layout;
