import React, { useState } from 'react';

const Playlist = () => {
  const [playlist, setPlaylist] = useState([]);

  const addToPlaylist = (song) => {
    setPlaylist((prevPlaylist) => [...prevPlaylist, song]);
  };

  return (
    <div>
      <h2>Playlist</h2>
      <h3>Playlist</h3>
      <ul>
        {playlist.map((song) => (
          <li key={song.id}>
            {song.title} by {song.artist}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
