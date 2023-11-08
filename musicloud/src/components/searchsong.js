import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/firebase';

const SearchSong = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const user = auth.currentUser; // Get the current authenticated user

  useEffect(() => {
    if (user) {
      // Define a reference to the 'songs' collection and query by 'username'
      const songsRef = db.collection('songs');
      const query = songsRef.where('username', '==', user.displayName);

      // Perform a query with the search query
      if (searchQuery) {
        query
          .where('title', '>=', searchQuery)
          .where('title', '<=', searchQuery + '\uf8ff')
          .get()
          .then((snapshot) => {
            const results = [];
            snapshot.forEach((doc) => {
              results.push(doc.data());
            });
            setSearchResults(results);
          })
          .catch((error) => {
            console.error('Error searching for songs:', error);
          });
      } else {
        // If the search query is empty, reset the results
        setSearchResults([]);
      }
    }
  }, [searchQuery, user]);

  return (
    <div>
      <h2>Search for Your Songs</h2>
      <input
        type="text"
        placeholder="Search by title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {searchResults.map((song, index) => (
          <li key={index}>{song.title} by {song.artist}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchSong;
