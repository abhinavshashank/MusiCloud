// // Layout.js
// import React, { useState } from 'react';
// import ReactAudioPlayer from 'react-audio-player';
// import { useNavigate } from 'react-router-dom';
// import { signOut } from 'firebase/auth';
// import './layout.css';

// const Layout = ({ mainContent }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => {
//         navigate('/');
//         console.log('Signed out successfully');
//       })
//       .catch((error) => {
//         // Handle sign-out error
//       });
//   };

//   // You need to define these states and functions here
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentSong, setCurrentSong] = useState(null);
//   const [playlistQueue, setPlaylistQueue] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const togglePlayPause = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const playNext = () => {
//     const nextIndex = (currentIndex + 1) % playlistQueue.length;
//     setCurrentIndex(nextIndex);
//     setCurrentSong(playlistQueue[nextIndex]);
//     setIsPlaying(true);
//   };

//   const playPrevious = () => {
//     const previousIndex = (currentIndex - 1 + playlistQueue.length) % playlistQueue.length;
//     setCurrentIndex(previousIndex);
//     setCurrentSong(playlistQueue[previousIndex]);
//     setIsPlaying(true);
//   };

//   const selectSong = (audioUrl, index) => {
//     setCurrentIndex(index);
//     setCurrentSong(audioUrl);
//     setIsPlaying(true);
//   };

//   return (
//     <div className="container">``
//       <div className="sidebar">
//         <div><a href="/home"><img src="musicloud-color-logo.svg" alt="MusiCloud Logo"/></a></div>
//         <div><a href="/upload">Upload Song</a></div>
        
//         <div><a href="/search">Search Song</a></div>
//         <div><a href="/my-songs">My Songs</a></div>
//         <div><a href="#" onClick={handleLogout}>Sign Out</a></div>
//       </div>
//       <div className="main_content">
//         {mainContent}
//       </div>
//       <div className="now-playing-container">
               
//                <footer>
//                <div id="player-controls">
//                         <button id="PrevButton" onClick={playPrevious} style={{ fontSize: 24, marginRight: 10 }}>
//                         ⏮️
//                     </button>
//                     {/* <button id="PlayPause" onClick={togglePlayPause} style={{ fontSize: 24 }}>
//                         {isPlaying ? '||' : '▶'}
//                     </button> */}
//                     <ReactAudioPlayer
//                         src={currentSong ? currentSong.audioUrl : 'default-audio-url.mp3'}
//                         autoPlay={false}
//                         controls
//                         onPlay={togglePlayPause}
//                         onPause={togglePlayPause}
//                     />
//                     <button id="NextButton" onClick={playNext} style={{ fontSize: 24, marginLeft: 10 }}>
//                         ⏭️
//                     </button>
//                </div>

//                </footer>
               
//             </div>
//     </div>
//   );
// };

// export default Layout;



// Layout.js
import React, { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { updateLikes } from '../firebase/firebase'; // Replace with your actual Firebase utility function
import './layout.css';

const Layout = ({ mainContent }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
        console.log('Signed out successfully');
      })
      .catch((error) => {
        // Handle sign-out error
      });
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [playlistQueue, setPlaylistQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likes, setLikes] = useState(currentSong?.likes || 0); // Initialize likes from the current song

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    const nextIndex = (currentIndex + 1) % playlistQueue.length;
    setCurrentIndex(nextIndex);
    setCurrentSong(playlistQueue[nextIndex]);
    setIsPlaying(true);
    setLikes(currentSong?.likes || 0); // Update likes when changing songs
  };

  const playPrevious = () => {
    const previousIndex = (currentIndex - 1 + playlistQueue.length) % playlistQueue.length;
    setCurrentIndex(previousIndex);
    setCurrentSong(playlistQueue[previousIndex]);
    setIsPlaying(true);
    setLikes(currentSong?.likes || 0); // Update likes when changing songs
  };

  const selectSong = (audioUrl, index, likes) => {
    setCurrentIndex(index);
    setCurrentSong({ audioUrl, likes });
    setIsPlaying(true);
    setLikes(likes || 0); // Initialize likes for the selected song
  };

  const handleLike = () => {
    const newLikes = likes + 1;
    updateLikes(currentSong.id, newLikes); // Replace with your actual update function
    setLikes(newLikes);
  };

  const handleDislike = () => {
    const newLikes = Math.max(0, likes - 1);
    updateLikes(currentSong.id, newLikes); // Replace with your actual update function
    setLikes(newLikes);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div><a href="/home"><img src="musicloud-color-logo.svg" alt="MusiCloud Logo"/></a></div>
        <div><a href="/upload">Upload Song</a></div>
        <div><a href="/search">Search Song</a></div>
        <div><a href="/my-songs">My Songs</a></div>
        <div><a href="#" onClick={handleLogout}>Sign Out</a></div>
      </div>
      <div className="main_content">
        {mainContent}
      </div>
      <div className="now-playing-container">
        <footer>
          <div id="player-controls">
            <button id="PrevButton" onClick={playPrevious} style={{ fontSize: 24, color: 'darkblue', marginRight: 10 }}>
              ⏮️
            </button>
            <ReactAudioPlayer
              src={currentSong ? currentSong.audioUrl : 'default-audio-url.mp3'}
              autoPlay={false}
              controls
              onPlay={togglePlayPause}
              onPause={togglePlayPause}
            />
            <button id="NextButton" onClick={playNext} style={{ fontSize: 24, color: 'darkblue', marginLeft: 10 }}>
              ⏭️
            </button>
            <div id="like-container">
                <button id="LikeButton" onClick={handleLike}>
                {/* Use your like logo or text */}
                Like
                </button>
                <span>{likes}</span>
                <button id="DislikeButton" onClick={handleDislike}>
                {/* Use your dislike logo or text */}
                Dislike
                </button>
            </div>
          
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
