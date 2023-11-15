import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage, db, auth } from '../firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { push, ref as rtdbRef, set } from 'firebase/database';
import { navigate } from 'react-router-dom';
import Layout from './Layout';

const UploadSong = () => {
  console.log("Render")
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
    if (!file || !title || !artist) {
      // Check if any of the required fields is empty
      console.error('Please fill in all the required fields.');
      return;
    }

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
        uid: user.uid, 
        filename: file.name, 
        likes: 0,
        streamed: 0,
      };

      const databaseRef = rtdbRef(db, 'songs'); 

      const newSongRef = push(databaseRef); 
      await set(newSongRef, songData);
      console.log('Song metadata added to the database.');

      navigate('/home');
    } catch (error) {
      console.error('Error uploading the file:', error);
    }
  };

  return (
    <Layout mainContent={
      <div>
      <h2>Upload a Song</h2>
      <input style={{ width: '400px', marginRight:'20px' }}  type="text" placeholder="Song Title*" value={title} onChange={(e) => setTitle(e.target.value)} required />
      
      <input style={{ width: '400px', marginRight:'20px' }} type="text" placeholder="Artist*" value={artist} onChange={(e) => setArtist(e.target.value)} required />
      <br/>
      <input  style={{ color: 'purple', backgroundcolor:'white', padding: '10px', width:'100px'}} type="file" onChange={handleFileChange} required />
      <br/>
      <button style={{ color: 'purple', backgroundcolor:'white', padding: '10px', marginRight: '30px' }} onClick={handleUpload}>Upload</button>
    </div>
    }/>
    
  );
};

export default UploadSong;
