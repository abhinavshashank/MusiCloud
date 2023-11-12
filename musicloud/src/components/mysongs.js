// import React, { useState, useEffect } from 'react';
// import { ref, query, orderByChild, get } from 'firebase/database';
// import { db } from '../firebase/firebase';
// import ReactAudioPlayer from 'react-audio-player';
// import { usePlaylist } from './PlaylistContext'; // Correct path to the PlaylistContext

// const MySongs = () => {
//   const { addToPlaylist } = usePlaylist(); // Use the context hook

//   const [mySongs, setMySongs] = useState([]);
//   const [selectedSong, setSelectedSong] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   useEffect(() => {
//     const songsRef = ref(db, 'songs');

//     const allSongsQuery = query(songsRef, orderByChild('uid'));

//     get(allSongsQuery)
//       .then((snapshot) => {
//         if (snapshot.exists()) {
//           const data = snapshot.val();
//           const allSongsArray = Object.values(data);

//           setMySongs(allSongsArray);
//         } else {
//           console.log('No songs found in the database.');
//           setMySongs([]);
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching songs:', error);
//       });
//   }, []);

//   const togglePlay = (song) => {
//     if (selectedSong === song && isPlaying) {
//       setSelectedSong(null);
//       setIsPlaying(false);
//     } else {
//       setSelectedSong(song);
//       setIsPlaying(true);
//     }
//   };

//   const handleAddToPlaylist = (song) => {
//     addToPlaylist(song);
//     console.log('Added to Playlist:', song);
//   };

//   return (
//     <div className='container'>
//       <div className='sidebar'>
//         <div><a href="/upload">Upload Song</a></div>
//         <div><a href="/home">Home</a></div>
//         <div><a href="/search">Search Song</a></div>
//         <div><a href="/my-songs">My Songs</a></div>
//       </div>
//       <div className='main_content'>
//         <div className='main_content_head'>Songs Library</div>
//         <h3>Songs:</h3>
//         <div>
//           {mySongs.map((song) => (
//             <div key={song.id}>
//               {song.title} by {song.artist}
//               <button onClick={() => togglePlay(song)}>
//                 {selectedSong === song && isPlaying ? '||' : '▶'}
//               </button>
//               <button onClick={() => handleAddToPlaylist(song)} style={{ color: 'white', backgroundColor: 'white', border: 'none' }}>
//                 🎵
//               </button>
//               <br />
//             </div>
//           ))}
//         </div>
//         <ReactAudioPlayer
//           src={selectedSong ? selectedSong.audioUrl : ''}
//           autoPlay={isPlaying}
//           controls
//         />
//       </div>
//     </div>
//   );
// };

// export default MySongs;



// MySongs.js
import React, { useState, useEffect } from 'react';
import { ref, query, orderByChild, get } from 'firebase/database';
import { db } from '../firebase/firebase';
import { usePlaylist } from './PlaylistContext';
import Layout from './Layout';

const MySongs = () => {
  const { addToPlaylist } = usePlaylist();

  const [mySongs, setMySongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

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

  console.log('Rendering MySongs component...');
  return (
    <Layout mainContent={
      <div className='main_content'>
        <div className='main_content_head'>Songs Library</div>
        <h1>My Songs:</h1>
        <div>
          {mySongs.map((song) => (
            <div key={song.id}>
              {song.title} by {song.artist}
              <button
                onClick={() => {
                  handleAddToPlaylist(song);
                  setSelectedSong(song);
                }}
                style={{ color: 'white', backgroundColor: 'white', border: 'none' }}
              >
                🎵
              </button>
              <br />
            </div>
          ))}
        </div>
      </div>
    }
    />
  );
};

export default MySongs;
