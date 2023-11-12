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
    <PlaylistContext.Provider value={{ playlist, addToPlaylist, removeFromPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => {
  return useContext(PlaylistContext);
};
