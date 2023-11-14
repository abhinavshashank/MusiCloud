import React, { createContext, useContext, useState } from 'react';

const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState([]);

  const addToPlaylist = (song) => {
    setPlaylist((prevPlaylist) => [...prevPlaylist, song]);
  };

  const removeFromPlaylist = (index) => {
    setPlaylist((prevPlaylist) => {
      const newPlaylist = [...prevPlaylist];
      newPlaylist.splice(index, 1);
      return newPlaylist;
    });
  };

  return (
    <PlaylistContext.Provider value={{ playlist, addToPlaylist, removeFromPlaylist, setPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error('usePlaylist must be used within a PlaylistProvider');
  }
  return context;
};
