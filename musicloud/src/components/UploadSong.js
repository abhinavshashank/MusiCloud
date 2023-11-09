import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage, db, auth } from '../firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { push, ref as rtdbRef, set } from 'firebase/database';
import { navigate } from 'react-router-dom';

const UploadSong = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const user = auth.currentUser; // Get the current authenticated user
    if (!user) {
      console.error('User is not authenticated.');
      return;
    }

    const storageRef = ref(storage, `Songs/${Date.now()}_${title}_${artist}_${file.name}`);

    try {
      await uploadBytes(storageRef, file);

      const audioUrl = await getDownloadURL(storageRef);

      const songData = {
        title,
        artist,
        audioUrl,
        uid: user.uid, // Include the user's UID in the song data
        // Add other metadata here
      };

      // Reference to the Realtime Database
      const databaseRef = rtdbRef(db, 'songs'); // Use rtdbRef to reference Realtime Database

      // Add a new song to the database
      const newSongRef = push(databaseRef); // Use push to generate a new unique key
      await set(newSongRef, songData);
      console.log('Song metadata added to the database.');

      navigate('/home');
    } catch (error) {
      console.error('Error uploading the file:', error);
    }
  };

  return (
    <div>
      <h2>Upload a Song</h2>
      <input type="text" placeholder="Song Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Artist" value={artist} onChange={(e) => setArtist(e.target.value)} />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadSong;
