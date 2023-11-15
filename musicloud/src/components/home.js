// Home.js
import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db, ref, query, orderByChild, limitToLast, get } from '../firebase/firebase';
import ReactAudioPlayer from 'react-audio-player';
import Layout from './Layout';
import { usePlaylist } from './PlaylistContext';

const Home = () => {
  const { addToPlaylist, playlist } = usePlaylist();
  const [popularSongs, setPopularSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    
    console.log('Toggle play/pause logic');
  }
  
  useEffect(() => {
    const songsRef = ref(db, 'songs');
    const topSongsQuery = query(
      songsRef,
      orderByChild('likes') 
    );
  
    get(topSongsQuery)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const topSongsArray = Object.entries(data)
            .sort((a, b) => b[1].likes - a[1].likes) 
            .map(([key, value]) => ({ ...value, id: key }));
          setPopularSongs(topSongsArray);
        } else {
          console.log('No popular songs found in the database.');
          setPopularSongs([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching popular songs:', error);
      });
  }, []);
  
  
  

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('Signed out successfully');
      })
      .catch((error) => {
        
      });
  };

  const handleAddToPlaylist = (song) => {
    addToPlaylist(song);
    console.log('Added to Playlist:', song);
  };

  

  const handlePlayPause = (audioUrl, playImmediately = false) => {
    const updatedPlaylist = [...playlist];
    const songIndex = updatedPlaylist.findIndex((song) => song.audioUrl === audioUrl);

    if (songIndex !== -1 && updatedPlaylist[songIndex]) {
      updatedPlaylist[songIndex].isPlaying = !updatedPlaylist[songIndex].isPlaying;

  
      setIsPlaying(updatedPlaylist[songIndex].isPlaying);
      addToPlaylist(updatedPlaylist[songIndex]);


      setSelectedSong(updatedPlaylist[songIndex]);

      if (playImmediately) {
        togglePlayPause();
      }
    }
  };

  return (
    <Layout
      mainContent={
        <div className="main_content">
          <h2>Popular Songs:</h2>
          <ol>
          {popularSongs.map((song) => (
            <li key={song.id} style={{padding:5}}>
                <span>{song.title} by {song.artist}</span>
                
                <span style={{marginRight:5}} >👍{song.likes || 0}</span>
                <button
                    style={{padding:10}}
                    onClick={() => {
                    handleAddToPlaylist(song);
                    handlePlayPause(song.audioUrl, true);
                    }}
                >
                    ▶
                </button>
                
            </li>
            ))}

          </ol>
        </div>
      }
      isPlaying={isPlaying}
      currentSong={selectedSong}
      playlist={playlist}
      togglePlayPause={handlePlayPause}
      handleLogout={handleLogout}
    />
  );
};

export default Home;
