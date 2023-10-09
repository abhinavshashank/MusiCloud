// src/components/PlayerControls.js
import React, { useState, useEffect } from 'react';
import { storage } from '../firebase/firebase'; // Import Firebase storage

const PlayerControls = ({ onPlayPause, onNext, onPrevious, onSongUpload }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  // Mocking a list of songs for demonstration purposes
  const songs = [
    'song1.mp3',
    'song2.mp3',
    'song3.mp3',
  ];

  useEffect(() => {
    // You can implement audio playback logic here
    const audioPlayer = document.getElementById('audio-player');

    if (isPlaying) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying((prevState) => !prevState);
    onPlayPause(); // Call the parent component's play/pause function
  };

  const handleNext = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      // If at the end of the playlist, loop back to the first song
      setCurrentSongIndex(0);
    }
    onNext(); // Call the parent component's next function
  };

  const handlePrevious = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    } else {
      // If at the beginning of the playlist, go to the last song
      setCurrentSongIndex(songs.length - 1);
    }
    onPrevious(); // Call the parent component's previous function
  };

  const handleSongUpload = (e) => {
    const file = e.target.files[0];

    // Check if a file was selected
    if (file) {
      const storageRef = storage.ref(`songs/${file.name}`);

      // Upload the selected file to Firebase Storage
      storageRef.put(file).then((snapshot) => {
        console.log('Uploaded a file:', file.name);

        // Implement logic to update the playlist with the new song
        // You can update the 'songs' array with the new song
        onSongUpload(file); // Call the parent component's song upload function
      });
    }
  };

  return (
    <div>
      <button onClick={togglePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleNext}>Next</button>
      <input type="file" accept="audio/*" onChange={handleSongUpload} />
      <audio id="audio-player" controls>
        <source src={`path/to/songs/${songs[currentSongIndex]}`} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default PlayerControls;
