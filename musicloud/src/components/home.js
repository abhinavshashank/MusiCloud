import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import PlayerControls from './PlayerControls';
import ReactAudioPlayer from 'react-audio-player';

const Home = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);
    const [playlistQueue, setPlaylistQueue] = useState([
        { title: 'Song 1', audioUrl: 'song1.mp3' },
        { title: 'Song 2', audioUrl: 'song2.mp3' },
        { title: 'Song 3', audioUrl: 'song3.mp3' },
    ]);

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

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const selectSong = (audioUrl) => {
        setCurrentSong(audioUrl);
    };

    return (
        <div className="home-container">
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="/upload">Upload Song</a></li>
                    <li><a href="/search">Search Song</a></li>
                    <li><a href="/my-songs">My Songs</a></li>
                    <li><a href="#" onClick={handleLogout}>Sign Out</a></li>
                </ul>
            </nav>

            <div className="player-container">
                <h2>Now Playing</h2>
                <ReactAudioPlayer
                    src={currentSong || 'default-audio-url.mp3'}
                    autoPlay={false}
                    controls
                    onPlay={togglePlayPause}
                    onPause={togglePlayPause}
                />
                <div id="player-controls">
                    <PlayerControls togglePlayPause={togglePlayPause} isPlaying={isPlaying} />
                </div>
            </div>
            <div className="playlist-container">
                <h2>Playlist Queue</h2>
                <ul>
                    {playlistQueue.map((song, index) => (
                        <li key={index}>
                            <a href="#" onClick={() => selectSong(song.audioUrl)}>
                                {song.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            
        </div>
    );
};

export default Home;
