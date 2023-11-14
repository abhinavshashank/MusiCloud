// MySongs.js
import React, { useState, useEffect } from 'react';
import { ref, query, orderByChild, get } from 'firebase/database';
import { db } from '../firebase/firebase';
import { usePlaylist } from './PlaylistContext';
import Layout from './Layout';


const MySongs = () => {
  const { addToPlaylist, playlist, setPlaylist } = usePlaylist();

  const [mySongs, setMySongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    const songsRef = ref(db, 'songs');
    const allSongsQuery = query(songsRef, orderByChild('uid'));

    get(allSongsQuery)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const allSongsArray = Object.values(data);

          setMySongs(allSongsArray);
        } else {
          console.log('No songs found in the database.');
          setMySongs([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching songs:', error);
      });
  }, []);

  const handleAddToPlaylist = (song) => {
    addToPlaylist(song);
    console.log('Added to Playlist:', song);
  };

//   const handlePlayPause = (audioUrl) => {
//     const songIndex = playlist.findIndex((song) => song.audioUrl === audioUrl);

//     // If the song is in the playlist, update its playing status
//     if (songIndex !== -1) {
//       const updatedPlaylist = [...playlist];
//       updatedPlaylist.forEach((item, index) => {
//         item.isPlaying = index === songIndex && !item.isPlaying;
//       });

//       setPlaylist(updatedPlaylist);
//       setSelectedSong(updatedPlaylist[songIndex]);
//       setIsPlaying(updatedPlaylist[songIndex].isPlaying);
//     }
//   };

// const handlePlayPause = (audioUrl) => {
    
//     const updatedPlaylist = [...playlist];
//     const songIndex = updatedPlaylist.findIndex((song) => song.audioUrl === audioUrl);
  
//     // Check if the song at the specified index exists
//     if (songIndex !== -1 && updatedPlaylist[songIndex]) {
//       // Toggle the isPlaying status for the clicked song
//       updatedPlaylist[songIndex].isPlaying = !updatedPlaylist[songIndex].isPlaying;
  
//       setPlaylist(updatedPlaylist);
//       setSelectedSong(updatedPlaylist[songIndex]);
//       setIsPlaying(updatedPlaylist[songIndex].isPlaying);
//     }
//   };
  
// const handlePlayPause = (audioUrl, playImmediately = false) => {
//     const updatedPlaylist = [...playlist];
//     const songIndex = updatedPlaylist.findIndex((song) => song.audioUrl === audioUrl);
  
//     if (songIndex !== -1 && updatedPlaylist[songIndex]) {
//       updatedPlaylist[songIndex].isPlaying = !updatedPlaylist[songIndex].isPlaying;
  
//       setPlaylist(updatedPlaylist);
  
//       // Define selectedSong here
//       const selectedSong = updatedPlaylist[songIndex];
  
//       setSelectedSong(selectedSong);
//       setIsPlaying(selectedSong.isPlaying);
  
//       if (playImmediately) {
//         // Trigger the play in Layout.js directly
//         togglePlayPause(audioUrl);
//       }
//     }
//   };

const handlePlayPause = (audioUrl, playImmediately = false) => {
    const updatedPlaylist = [...playlist];
    const songIndex = updatedPlaylist.findIndex((song) => song.audioUrl === audioUrl);
  
    if (songIndex !== -1 && updatedPlaylist[songIndex]) {
      updatedPlaylist[songIndex].isPlaying = !updatedPlaylist[songIndex].isPlaying;
  
      setPlaylist(updatedPlaylist);
  
      // Define selectedSong here
      const selectedSong = updatedPlaylist[songIndex];
  
      setSelectedSong(selectedSong);
  
      if (playImmediately) {
        togglePlayPause();
      }
  

      setIsPlaying(selectedSong.isPlaying);
    }
  };
  
   
  
  

  console.log('Rendering MySongs component...');

  return (
    <Layout
      mainContent={
        <div className='main_content'>
          <h1 style={{ color: 'purple'}}>Songs Library:</h1>
          <div>
          {mySongs.map((song) => (
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
          </div>
        </div>
      }
      isPlaying={isPlaying}
      currentSong={selectedSong}
      playlist={playlist}
      togglePlayPause={handlePlayPause}
    />
  );
};

export default MySongs;
