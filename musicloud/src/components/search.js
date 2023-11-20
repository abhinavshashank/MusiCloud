

import React, { useState, useEffect } from 'react';
import { ref, query, orderByChild, get } from 'firebase/database';
import { db } from '../firebase/firebase';
import Layout from './Layout';
import './search.css';
import ReactAudioPlayer from 'react-audio-player';
import { usePlaylist } from './PlaylistContext';
import AnimatedHeartButton from './AnimatedHeartButton';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { addToPlaylist, playlist, setPlaylist } = usePlaylist();

  const handleSearch = async () => {
    const songsRef = ref(db, 'songs');
    const searchQuery = query(songsRef, orderByChild('title'));

    try {
      const snapshot = await get(searchQuery);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const allSongsArray = Object.values(data);

        const searchResultsArray = allSongsArray.filter(song =>
          song.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setSearchResults(searchResultsArray);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching for songs:', error);
    }
  };

  const handlePlay = () => {
    // Check if there's a selected song in the playlist
    if (selectedSong) {
      // Toggle play/pause for the selected song
      setIsPlaying(!isPlaying);
    } else if (playlist.length > 0) {
      // If there's no selected song but the playlist has songs, start playing the first song
      setSelectedSong(playlist[0]);
      setIsPlaying(true);
    }
  };

  const togglePlayPause = (audioUrl) => {
    const updatedSearchResults = [...searchResults];
    const songIndex = updatedSearchResults.findIndex((song) => song.audioUrl === audioUrl);

    if (songIndex !== -1 && updatedSearchResults[songIndex]) {
      updatedSearchResults[songIndex].isPlaying = !updatedSearchResults[songIndex].isPlaying;

      setSearchResults(updatedSearchResults);
      setSelectedSong(updatedSearchResults[songIndex]);
      setIsPlaying(updatedSearchResults[songIndex].isPlaying);
    }
  };

  const handleAddToPlaylist = (song) => {
    // Check if the song is already in the playlist
    const isSongInPlaylist = playlist.some((playlistSong) => playlistSong.id === song.id);

    if (!isSongInPlaylist) {
      // Add the song to the playlist
      setPlaylist([...playlist, song]);

      // If no song is currently playing, set the added song as the selected song
      if (!selectedSong) {
        setSelectedSong(song);
        //setIsPlaying(false); // Pause the playback
      }

      console.log('Added to Playlist:', song);
    } else {
      console.log('Song is already in the playlist.');
    }
  };


  const playNext = () => {
    const currentIndex = searchResults.findIndex((song) => song.audioUrl === selectedSong.audioUrl);
    const nextIndex = (currentIndex + 1) % searchResults.length;
    setSelectedSong(searchResults[nextIndex]);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    const currentIndex = searchResults.findIndex((song) => song.audioUrl === selectedSong.audioUrl);
    const previousIndex = (currentIndex - 1 + searchResults.length) % searchResults.length;
    setSelectedSong(searchResults[previousIndex]);
    setIsPlaying(true);
  };

  const handleLike = () => {
    if (selectedSong && selectedSong.id) {
      const newLikes = (selectedSong.likes || 0) + 1;
      // Your logic to update likes in the database
    }
  };

  const handleDislike = () => {
    if (selectedSong && selectedSong.id) {
      const currentLikes = selectedSong.likes || 0;
      const newLikes = Math.max(0, currentLikes - 1);
      // Your logic to update dislikes in the database
    }
  };

  return (
    <Layout
      mainContent={
        <div>
          <h2>Search for a Song</h2>
          <input
            type="text"
            placeholder="Enter song title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '400px', marginRight: '20px' }}
          />
          <button onClick={handleSearch}>Search</button>

          <h3>Search Results:</h3>
          <ul style={{ color: 'purple' }}>
            {searchResults.map((song) => (
              <div key={song.id}>
                {song.title} by {song.artist}
                <div className="song-buttons" style={{ backgroundColor: 'white', border: 'none', padding: '20px', marginLeft: '250px' }}>
                  <button
                    onClick={() => {
                      handleAddToPlaylist(song);
                      togglePlayPause(song.url)
                      
                    }}
                    style={{ color: 'purple', padding: '11px', marginRight: '30px' }}
                  >
                    ▶
                  </button>
                  <button
                    onClick={() => {
                      handleAddToPlaylist(song);
                      // Handle play/pause separately
                      handlePlay();
                    }}
                    style={{ backgroundColor: 'purple', padding: '10px' }}
                  >
                    🎵
                  </button>
                  <br />
                </div>
              </div>
            ))}
          </ul>

          {(
            <div className="now-playing-container">
              <footer>
                <div id="player-controls">
                  <button
                    id="PrevButton"
                    onClick={playPrevious}
                    style={{ fontSize: 20, color: 'darkblue', marginRight: 10 }}
                  >
                    ⏮️
                  </button>
                  <ReactAudioPlayer
                    className="audioplayer"
                    style={{ fontSize: 30, color: 'white', width: 420 }}
                    src={selectedSong ? selectedSong.audioUrl : ''}
                    autoPlay={isPlaying}
                    controls
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                  <button
                    id="NextButton"
                    onClick={playNext}
                    style={{ fontSize: 20, color: 'darkblue', marginLeft: 10 }}
                  >
                    ⏭️
                  </button>
                  
                    <span id="like-container">
                    {selectedSong && <AnimatedHeartButton songId={selectedSong.id} />}
                    </span>
                    
                </div>
              </footer>
            </div>
          )}
        </div>
      }
      isPlaying={isPlaying}
      currentSong={selectedSong}
      playlist={playlist}
      togglePlayPause={togglePlayPause}
    />
  );
};

export default Search;
