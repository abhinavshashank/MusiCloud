import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, query, orderByChild, equalTo, get } from 'firebase/database';
import { db } from '../firebase/firebase';
import ReactAudioPlayer from 'react-audio-player';

const Search = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  const handleSearch = async () => {
    // Reference to the songs node in the database
    const songsRef = ref(db, 'songs');

    // Create a query to search for songs with a specific child key (e.g., 'title')
    const searchQuery = query(
      songsRef,
      orderByChild('title'), // Replace 'title' with your actual child key
      equalTo(searchTerm) // Use the search term as the value to compare
    );

    console.log('searchTerm:', searchTerm);
    console.log('searchQuery:', searchQuery);

    try {
      const snapshot = await get(searchQuery);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const searchResultsArray = Object.values(data);
        console.log('searchResultsArray:', searchResultsArray);
        setSearchResults(searchResultsArray);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching for songs:', error);
    }
  };

  const togglePlay = (song) => {
    if (selectedSong === song && isPlaying) {
      setSelectedSong(null);
      setIsPlaying(false);
    } else {
      setSelectedSong(song);
      setIsPlaying(true);
    }
  };

  const addToPlaylist = (song) => {
    // Implement logic to add the selected song to the playlist
    console.log('Add to Playlist:', song);
  };

  return (
    <div>
      <div className='sidebar'>
                <div><a href="/upload">Upload Song</a></div>
                <div><a href="/home">Home</a></div>
                <div><a href="/search">Search Song</a></div>
                <div><a href="/my-songs">My Songs</a></div>
                <div><a href="#" onClick={handleLogout}>Sign Out</a></div>
      </div>
      <h2>Search for a Song</h2>
      <input
        type="text"
        placeholder="Enter song title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <h3>Search Results:</h3>
      <ul style={{ color: 'white' }}>
        {searchResults.map((song) => (
          <li key={song.id}>
            {song.title} by {song.artist}
            <button onClick={() => togglePlay(song)}>
              {selectedSong === song && isPlaying ? '||' : '▶'}
            </button>
            <button onClick={() => addToPlaylist(song)} style={{ color: 'white', backgroundColor: 'transparent', border: 'none' }}>
              🎵 
            </button>
          </li>
        ))}
      </ul>

      <ReactAudioPlayer
        src={selectedSong ? selectedSong.audioUrl : ''}
        autoPlay={isPlaying}
        controls
      />
    </div>
  );
};

export default Search;
