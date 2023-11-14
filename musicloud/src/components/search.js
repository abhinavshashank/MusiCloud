// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ref, query, orderByChild, equalTo, get } from 'firebase/database';
// import { db } from '../firebase/firebase';
// import ReactAudioPlayer from 'react-audio-player';
// import './search.css'
// import Layout from './Layout';

// const Search = () => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [selectedSong, setSelectedSong] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const handleLogout = () => {
//     signOut(auth)
//         .then(() => {
//             navigate('/');
//             console.log('Signed out successfully');
//         })
//         .catch((error) => {
//             // Handle sign-out error
//         });
//   };

  // const handleSearch = async () => {
  //   // Reference to the songs node in the database
  //   const songsRef = ref(db, 'songs');

  //   // Create a query to search for songs with a specific child key (e.g., 'title')
  //   const searchQuery = query(
  //     songsRef,
  //     orderByChild('title'), // Replace 'title' with your actual child key
  //     equalTo(searchTerm) // Use the search term as the value to compare
  //   );

  //   console.log('searchTerm:', searchTerm);
  //   console.log('searchQuery:', searchQuery);

  //   try {
  //     const snapshot = await get(searchQuery);

  //     if (snapshot.exists()) {
  //       const data = snapshot.val();
  //       const searchResultsArray = Object.values(data);
  //       console.log('searchResultsArray:', searchResultsArray);
  //       setSearchResults(searchResultsArray);
  //     } else {
  //       setSearchResults([]);
  //     }
  //   } catch (error) {
  //     console.error('Error searching for songs:', error);
  //   }
  // };

//   const togglePlay = (song) => {
//     if (selectedSong === song && isPlaying) {
//       setSelectedSong(null);
//       setIsPlaying(false);
//     } else {
//       setSelectedSong(song);
//       setIsPlaying(true);
//     }
//   };

//   const addToPlaylist = (song) => {
//     // Implement logic to add the selected song to the playlist
//     console.log('Add to Playlist:', song);
//   };

//   return (

//     <Layout mainContent={
//       <div>
//       <h2>Search for a Song</h2>
//       <input
//         type="text"
//         placeholder="Enter song title"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <button onClick={handleSearch}>Search</button>

//       <h3>Search Results:</h3>
//       <ul style={{ color: 'white' }}>
//         {searchResults.map((song) => (
//           <li key={song.id}>
//             {song.title} by {song.artist}
//             <button onClick={() => togglePlay(song)}>
//               {selectedSong === song && isPlaying ? '||' : '▶'}
//             </button>
//             <button onClick={() => addToPlaylist(song)} style={{ color: 'white', backgroundColor: 'transparent', border: 'none' }}>
//               🎵 
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//     }/>
    
//   );
// };

// export default Search;


import React, { useState } from 'react';
import { ref, query, orderByChild, equalTo, get } from 'firebase/database';
import { db } from '../firebase/firebase';
import Layout from './Layout';
import { usePlaylist } from './PlaylistContext';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { addToPlaylist, playlist, setPlaylist } = usePlaylist();

  const handleSearch = async () => {
    // Reference to the songs node in the database
    const songsRef = ref(db, 'songs');
  
    // Create a query to search for songs with a specific child key (e.g., 'title')
    const searchQuery = query(
      songsRef,
      orderByChild('title')
    );
  
    try {
      const snapshot = await get(searchQuery);
  
      if (snapshot.exists()) {
        const data = snapshot.val();
        const allSongsArray = Object.values(data);
  
        // Filter the songs based on the search term
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
    // Check if the song is not already in the playlist
    if (!playlist.find((pSong) => pSong.id === song.id)) {
      const updatedPlaylist = [...playlist, song];
      setPlaylist(updatedPlaylist);
      console.log('Added to Playlist:', song);
    } else {
      console.log('Song already in the playlist:', song);
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
              style={{ width: '400px', marginRight:'20px' }} 
          />
          <button onClick={handleSearch}>Search</button>

          <h3>Search Results:</h3>
          <ul style={{ color: 'purple' }}>
            {searchResults.map((song) => (
              <div key={song.id}>
                {song.title} by {song.artist}
                <div className='song-buttons' 
               style={{  backgroundColor: 'white', border: 'none', padding: '20px',  marginLeft: '250px'  }}
               >
                <button onClick={() => {handleAddToPlaylist(song);handlePlayPause(song.audioUrl);}}
                style={{ color: 'purple', padding: '11px', marginRight: '30px' }}
                >
                    ▶ {/* {selectedSong?.isPlaying ? '| |' : '▶'} */}
                    </button>
                    <button
                        onClick={() => {
                        handleAddToPlaylist(song);
                        setSelectedSong(song);
                        }}
                        style={{ backgroundcolor: 'purple', padding: '10px',}}
                    >
                        🎵
                    </button>
                <br />
               </div>
              </div>
            ))}
          </ul>
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
