import React, { useState, useEffect } from 'react';
import { ref, query, orderByChild, equalTo, get } from 'firebase/database';
import { db, auth } from '../firebase/firebase'; // Import auth from Firebase

const MySongs = () => {
    const [mySongs, setMySongs] = useState([]);
  
    useEffect(() => {
      const user = auth.currentUser; // Get the current authenticated user
  
      if (user) {
        // Reference to the songs node in the database
        const songsRef = ref(db, 'songs');
  
        // Create a query to filter songs by the current user's UID
        const mySongsQuery = query(
          songsRef,
          orderByChild('uid'), // Replace 'uid' with the field that stores the user ID
          equalTo(user.uid) // Filter by the current user's UID
        );
  
        get(mySongsQuery)
          .then((snapshot) => {
            console.log('Snapshot:', snapshot);
  
            if (snapshot.exists()) {
              const data = snapshot.val();
              console.log('Data:', data);
              const mySongsArray = Object.values(data);
              console.log('mySongsArray:', mySongsArray);
              setMySongs(mySongsArray);
            } else {
              console.log('No songs found for the user.');
              setMySongs([]);
            }
          })
          .catch((error) => {
            console.error('Error fetching my songs:', error);
          });
      }
    }, []);

  return (
    <div>
        <nav>
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/upload">Upload Song</a></li>
          <li><a href="/search">Search Song</a></li>
          <li><a href="/my-songs">My Songs</a></li>
        </ul>
      </nav>
      <h2>My Uploaded Songs</h2>

      <ul style={{ color: 'white' }}>
        {mySongs.map((song) => (
          <li key={song.id}>
            {song.title} by {song.artist}
            <ReactAudioPlayer
              src={song.audioUrl}
              controls
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MySongs;
