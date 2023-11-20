// Home.js
import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db, ref, query, orderByChild, limitToLast, get } from '../firebase/firebase';
import ReactAudioPlayer from 'react-audio-player';
import Layout from './Layout';
import { usePlaylist } from './PlaylistContext';
import './search.css'
import AnimatedHeartButton from './AnimatedHeartButton';

const Home = () => {

  const [popularSongs, setPopularSongs] = useState([]);
  const { addToPlaylist, playlist, setPlaylist } = usePlaylist();
  const [mySongs, setMySongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likes, setLikes] = useState(0);
  
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
  
  
  

  // const handleLogout = () => {
  //   signOut(auth)
  //     .then(() => {
  //       console.log('Signed out successfully');
  //     })
  //     .catch((error) => {
        
  //     });
  // };

  const handleAddToPlaylist = (song) => {
    const isSongInPlaylist = playlist.some((playlistSong) => playlistSong.id === song.id);

    if (!isSongInPlaylist) {

      setPlaylist([...playlist, song]);


      if (!selectedSong) {
        setSelectedSong(song);
      }

      console.log('Added to Playlist:', song);
    } else {
      console.log('Song is already in the playlist.');
    }
  };

  

  const handlePlay = () => {
    console.log('handlePlay');

    if (selectedSong) {

      setIsPlaying(!isPlaying);
    } else if (playlist.length > 0) {

      console.log('Starting to play the first song from the playlist');
      setSelectedSong(playlist[0]);
      setIsPlaying(true);
    }
  };
  
  const handlePlayPause = (audioUrl, playImmediately = false) => {
    console.log('handlePlayPause', audioUrl, playImmediately);
    const updatedPlaylist = [...playlist];
    const songIndex = updatedPlaylist.findIndex((song) => song.audioUrl === audioUrl);
  
    if (songIndex !== -1 && updatedPlaylist[songIndex]) {
      updatedPlaylist[songIndex].isPlaying = !updatedPlaylist[songIndex].isPlaying;
  
      setPlaylist(updatedPlaylist);
  
      const selectedSong = updatedPlaylist[songIndex];
  
      setSelectedSong(selectedSong);
  
      if (playImmediately) {
        togglePlayPause();
      }
  
      setIsPlaying(selectedSong.isPlaying);
      setLikes(selectedSong.likes || 0);
    }
  };
  

  const playNext = () => {
    const currentIndex = mySongs.findIndex((song) => song.audioUrl === selectedSong.audioUrl);
    const nextIndex = (currentIndex + 1) % mySongs.length;
    setSelectedSong(mySongs[nextIndex]);
    setIsPlaying(true);
  };
  
  const playPrevious = () => {
    const currentIndex = mySongs.findIndex((song) => song.audioUrl === selectedSong.audioUrl);
    const previousIndex = (currentIndex - 1 + mySongs.length) % mySongs.length;
    setSelectedSong(mySongs[previousIndex]);
    setIsPlaying(true);
  };
  

  console.log('Rendering Home component...');

  return (
    <Layout
      mainContent={
        <div className="main_content">
          <h2>Popular Songs:</h2>
          <ol>
          {popularSongs.map((song) => (
            <li key={song.id} style={{padding:5}}>
                <span>{song.title} by {song.artist}</span>
                <div className="song-buttons" style={{ border: 'none', padding: '20px', marginLeft: '250px' }}>
                <span style={{marginRight:5}} >❤️{song.likes || 0}</span>
                <button
                    style={{padding:10, marginRight:5}}
                    onClick={() => {
                      handleAddToPlaylist(song);
                    }}
                >
                    ▶
                </button>
                <button
                    onClick={() => {
                      handleAddToPlaylist(song);

                      handlePlay();
                    }}
                    style={{ backgroundColor: 'purple', padding: '10px' }}
                  >
                    🎵
                  </button>
                  <br />
                </div>
                
                
            </li>
            ))}

          </ol>
          { (
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
                    {selectedSong && selectedSong.id && (
                      <AnimatedHeartButton songId={selectedSong.id} />  )}

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
      togglePlayPause={handlePlay}
    />
  );
};

export default Home;
