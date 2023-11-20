// // Layout.js
// import React, { useState, useEffect } from 'react';
// import ReactAudioPlayer from 'react-audio-player';
// import { useNavigate, Link  } from 'react-router-dom';
// import { signOut } from 'firebase/auth';
// import { auth, updateLikes } from '../firebase/firebase';
// import { usePlaylist } from './PlaylistContext';
// import './layout.css';

// const Layout = ({ mainContent, isPlaying, currentSong, playlist, isAuthenticated }) => {
//     const navigate = useNavigate();
//     const { setPlaylist } = usePlaylist();

//     console.log('Layout - Rendering with currentSong:', currentSong);
//     console.log('Layout - isPlaying:', isPlaying);
//     console.log('Layout - playlist:', playlist);

//     const handleLogout = () => {
//         signOut(auth)
//             .then(() => {
//                 navigate('/');
//                 console.log('Signed out successfully');
//             })
//             .catch((error) => {
//                 // Handle sign-out error
//             });
//     };

//     const [playlistQueue, setPlaylistQueue] = useState([]);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [likes, setLikes] = useState(currentSong?.likes || 0);
//     const [isPlayingInternal, setIsPlayingInternal] = useState(false);
//     const [isPlayingState, setIsPlaying] = useState(isPlaying);


//     useEffect(() => {
//         // Check if there is a current song and it should be playing
//         if (currentSong && isPlayingInternal) {
//           // Automatically start playing the current song
//           setIsPlayingInternal(true);
//         } else {
//           // Pause the player if there is no current song or it shouldn't be playing
//           setIsPlayingInternal(false);
//         }
//       }, [currentSong, isPlayingInternal]);
    
//       const togglePlayPause = () => {
//         if (currentSong) {
//           const updatedPlaylist = [...playlist];
//           const songIndex = updatedPlaylist.findIndex((song) => song.id === currentSong.id);
//           if (songIndex !== -1) {
//             updatedPlaylist[songIndex].isPlaying = !updatedPlaylist[songIndex].isPlaying;
//             setPlaylist(updatedPlaylist);
//             setIsPlaying(updatedPlaylist[songIndex].isPlaying);
//           }
//         } else {
//           // Otherwise, toggle the global play/pause state
//           setIsPlaying(!isPlaying);
//         }
//       };
      
      

//     const playNext = () => {
//         const nextIndex = (currentIndex + 1) % playlistQueue.length;
//         setCurrentIndex(nextIndex);
//         setCurrentSong(playlistQueue[nextIndex]);
//         setIsPlaying(true);
//         setLikes(playlistQueue[nextIndex]?.likes || 0);
//     };

//     const playPrevious = () => {
//         const previousIndex = (currentIndex - 1 + playlistQueue.length) % playlistQueue.length;
//         setCurrentIndex(previousIndex);
//         setCurrentSong(playlistQueue[previousIndex]);
//         setIsPlaying(true);
//         setLikes(playlistQueue[previousIndex]?.likes || 0);
//     };

//     const handleLike = () => {
//         console.log('Handling like...');
//         if (currentSong && currentSong.id) {
//             console.log('Song ID:', currentSong.id);
//             const newLikes = (currentSong.likes || 0) + 1;
//             updateLikes(currentSong.id, newLikes)
//                 .then(() => {
//                     setLikes(newLikes);
//                     console.log('Updated the likes');
//                 })
//                 .catch((error) => {
//                     console.error('Error updating likes:', error);
//                 });
//         }
//     };
    
    
//     const handleDislike = () => {
//         if (currentSong && currentSong.id) {
//             const currentLikes = currentSong.likes || 0;
//             const newLikes = Math.max(0, currentLikes - 1);
    
            
//             if (currentSong.id) {
//                 updateLikes(currentSong.id, newLikes)
//                     .then(() => {
//                         setLikes(newLikes); 
//                         console.log('Updated the dislikes');
//                     })
//                     .catch((error) => {
//                         console.error('Error updating dislikes:', error);
//                     });
//             } else {
//                 console.error('Current song ID is undefined'); 
//             }
//         } else {
//             console.error('Current song is undefined'); 
//         }
//     };
    
    

//     console.log('Layout - Rendering...');
//     return (
//         <div className="container">
//             <div className="sidebar">
//                 <div>
//                     <Link to ="/home">
//                         <img src="musicloud-color-logo.svg" alt="MusiCloud Logo" />
//                     </Link>
//                 </div>
//                 <div style={{ fontSize: 18, color: 'white', marginTop: 30 }}>
//                     <Link to="/upload">Upload Song</Link>
//                 </div>
//                 <div style={{ fontSize: 18, color: 'white', marginTop: 50 }}>
//                     <Link to="/search">Search Song</Link>
//                 </div>
//                 <div style={{ fontSize: 18, color: 'white', marginTop: 50 }}>
//                     <Link to="/my-songs">My Songs</Link>
//                 </div>
//                 <div>
                    
//                     <button type="button" onClick={handleLogout} style={{ fontSize: 18, backgroundcolor: 'purple', color:'purple', marginTop: 75 }}>
//                         <Link to="/" onClick={handleLogout}>
//                             Sign Out
//                         </Link>
//                     </button>
//                 </div>
//             </div>
//             <div className="main_content">{mainContent}</div>
//             <div className="now-playing-container">
//                 <footer>
//                     <div id="player-controls">
//                         <button
//                             id="PrevButton"
//                             onClick={playPrevious}
//                             style={{ fontSize: 20, color: 'darkblue', marginRight: 10,  }}
//                         >
//                             ⏮️
//                         </button>
//                         <ReactAudioPlayer className='audioplayer'
//                             style={{ fontSize: 30, color: 'white', width: 420,  }}
//                             playButtonColor="800080"
//                             src={currentSong ? currentSong.audioUrl : ''}
//                             autoPlay={true}
//                             controls
//                             onPlay={() => togglePlayPause()}  
//                             onPause={() => togglePlayPause()}  
//                         />
//                         <button
//                             id="NextButton"
//                             onClick={playNext}
//                             style={{ fontSize: 20, color: 'darkblue', marginLeft: 10 }}
//                         >
//                             ⏭️
//                         </button>
//                         <span id="like-container">
//                             <button id="LikeButton" onClick={handleLike}>
//                             👍
//                             </button>
//                             <span>{likes}</span>
//                             <button id="DislikeButton" onClick={handleDislike}>
//                             👎
//                             </button>
//                         </span>
//                     </div>
//                 </footer>
//             </div>
//         </div>
//     );
// };

// export default Layout;


import React, { useState, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useNavigate, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, updateLikes } from '../firebase/firebase';
import { usePlaylist } from './PlaylistContext';
import './layout.css';

const Layout = ({ mainContent, isPlaying, currentSong, playlist, isAuthenticated }) => {
  const navigate = useNavigate();
  const { setPlaylist } = usePlaylist();

  console.log('Layout - Rendering with currentSong:', currentSong);
  console.log('Layout - isPlaying:', isPlaying);
  console.log('Layout - playlist:', playlist);

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

  
  console.log('Layout - Rendering...');
  return (
    <div className="container">
      <div className="sidebar">
        <div>
          <Link to="/home">
            <img src="musicloud-color-logo.svg" alt="MusiCloud Logo" />
          </Link>
        </div>
        <div style={{ fontSize: 18, color: 'white', marginTop: 30 }}>
          <Link to="/upload">Upload Song</Link>
        </div>
        <div style={{ fontSize: 18, color: 'white', marginTop: 50 }}>
          <Link to="/search">Search Song</Link>
        </div>
        <div style={{ fontSize: 18, color: 'white', marginTop: 50 }}>
          <Link to="/my-songs">My Songs</Link>
        </div>
        <div>
            <footer>

            <button
            type="button"
            onClick={handleLogout}
            style={{ fontSize: 18, backgroundColor: 'purple', color: 'white', marginTop: 75 }}
            >
            <Link to="/" onClick={handleLogout}>
              Sign Out
            </Link>
          </button>

            </footer>
          
        </div>
      </div>
      <div className="main_content">{mainContent}</div>
      </div>
  );
};

export default Layout;
