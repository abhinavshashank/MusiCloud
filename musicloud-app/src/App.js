import React, { useState } from 'react';
import './App.css'; // Import your CSS styles here
import AudioPlayer from 'react-audio-player';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="App">
      <header>
        <img src="musicloud-color-logo.svg" alt="MusiCloud Logo" />
        <h1>MusiCloud</h1>
      </header>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Upload Song</a></li>
          <li><a href="#">Search Song</a></li>
          <li><a href="#">Favorites</a></li>
        </ul>
      </nav>
      <main>
        <section>
          <h2>Now Playing</h2>
          <AudioPlayer
            src="song.mp3"
            autoPlay={false}
            controls
            onPlay={togglePlayPause}
            onPause={togglePlayPause}
          />
          <div id="player-controls">
            <button id="prev-button" className="control-button">Previous</button>
            <button
              id="play-pause-button"
              className="control-button"
              onClick={togglePlayPause}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button id="next-button" className="control-button">Next</button>
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2023 MusiCloud</p>
      </footer>
    </div>
  );
}

export default App;
