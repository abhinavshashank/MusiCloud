// MySongs.js

import React, { useState, useEffect } from 'react';
import { ref, query, orderByChild, equalTo, get } from 'firebase/database';
import { auth, db } from '../firebase/firebase';
import { usePlaylist } from './PlaylistContext';
import Layout from './Layout';
import ReactAudioPlayer from 'react-audio-player';
import AnimatedHeartButton from './AnimatedHeartButton';

const MySongs = () => {
  const { addToPlaylist, playlist, setPlaylist } = usePlaylist();
  const [mySongs, setMySongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      const songsRef = ref(db, 'songs');
      const userSongsQuery = query(songsRef, orderByChild('uid'), equalTo(user.uid));

      get(userSongsQuery)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const userSongsArray = Object.values(data);

            setMySongs(userSongsArray);
          } else {
            console.log('No songs found in the database for the current user.');
            setMySongs([]);
          }
        })
        .catch((error) => {
          console.error('Error fetching songs:', error);
        });
    }
  }, []);

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
  



 
  console.log('Rendering MySongs component...');

  return (
    <Layout
      mainContent={
        <div className='main_content'>
          <h1 style={{ color: 'purple' }}>Songs Library:</h1>
          <div>
            {mySongs.map((song) => (
              <div key={song.id}>
                {song.title} by {song.artist}
                <div
                  className='song-buttons'
                  style={{ backgroundColor: 'white', border: 'none', padding: '20px', marginLeft: '250px' }}
                >
                  <button
                    onClick={() => {
                      handleAddToPlaylist(song);

                    }}
                    style={{ color: 'purple', padding: '11px', marginRight: '30px', paddingLeft: '12px' }}
                  >
                    ▶
                  </button>
                  <button
                    onClick={() => {
                      handleAddToPlaylist(song);

                      handlePlay();
                    }}
                    style={{ backgroundcolor: 'purple', padding: '10px' }}
                  >
                    🎵
                  </button>
                  <br />
                </div>
              </div>
            ))}
          </div>
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
                  className='audioplayer'
                  style={{ fontSize: 30, color: 'white', width: 420 }}
                  src={selectedSong ? selectedSong.audioUrl : ''}
                  autoPlay={!!selectedSong}  
                  controls
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
                <button id="NextButton" onClick={playNext} style={{ fontSize: 20, color: 'darkblue', marginLeft: 10 }}>
                  ⏭️
                </button>
                
                <span id="like-container">
                {selectedSong && <AnimatedHeartButton songId={selectedSong.id} />}

                </span>
                
              </div>
            </footer>
          </div>
        </div>
      }
      isPlaying={isPlaying}
      currentSong={selectedSong}
      playlist={playlist}
      togglePlayPause={handlePlay} 
    />
  );
};

export default MySongs;