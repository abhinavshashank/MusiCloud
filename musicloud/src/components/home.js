// import './home.css';
// import ReactAudioPlayer from 'react-audio-player';
// import React, { useState } from 'react';
// import { signOut } from "firebase/auth";
// import { auth } from '../firebase/firebase';
// import { useNavigate } from 'react-router-dom';
// import PlayerControls from './PlayerControls'; // Import the PlayerControls component

// const Home = () => {
//     const navigate = useNavigate();
//     const [isPlaying, setIsPlaying] = useState(false); // State for play/pause button

//     const handleLogout = () => {
//         signOut(auth).then(() => {
//             // Sign-out successful.
//             navigate("/");
//             console.log("Signed out successfully")
//         }).catch((error) => {
//             // An error happened.
//         });
//     }

//     // Function to toggle play/pause state
//     const togglePlayPause = () => {
//         setIsPlaying(!isPlaying);
//     }

//     return (
//         <div>
//             <nav>
//                 <ul>
//                     <li><a href="#">Home</a></li>
//                     <li><a href="#">Upload Song</a></li>
//                     <li><a href="#">Search Song</a></li>
//                     <li><a href="#">Favorites</a></li>
//                     <li><a href="#" onClick={handleLogout}>Sign Out</a></li>
//                 </ul>
//             </nav>
//             <main>
//                 <section >
//                     <h2>Now Playing</h2>
//                     <ReactAudioPlayer
//                         src="song.mp3"
//                         autoPlay={false}
//                         controls
//                         onPlay={togglePlayPause}
//                         onPause={togglePlayPause}
//                     />
//                     <div id="player-controls">
//                         {/* Pass the togglePlayPause function and isPlaying state to PlayerControls */}
//                         <PlayerControls
//                             togglePlayPause={togglePlayPause}
//                             isPlaying={isPlaying}
//                         />
//                     </div>
//                 </section>
//             </main>
//             {/* <footer>
//                 <p>&copy; 2023 MusiCloud</p>
//             </footer> */}
//         </div>
//     )
// }

// export default Home;



import React, { useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import PlayerControls from './PlayerControls';
import ReactAudioPlayer from 'react-audio-player';


const Home = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(null); // State to store the currently selected song's audio URL
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                navigate("/");
                console.log("Signed out successfully");
            })
            .catch((error) => {
                // Handle sign-out error
            });
    }

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    }

    const selectSong = (audioUrl) => {
        setCurrentSong(audioUrl);
    }

    return (
        <div>
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Upload Song</a></li>
                    <li><a href="#">Search Song</a></li>
                    <li><a href="#">Favorites</a></li>
                    <li><a href="#" onClick={handleLogout}>Sign Out</a></li>
                </ul>
            </nav>
            <main>
                <section>
                    <h2>Now Playing</h2>
                    <ReactAudioPlayer
                        src={currentSong || "default-audio-url.mp3"} // Use the currently selected song's audio URL
                        autoPlay={false}
                        controls
                        onPlay={togglePlayPause}
                        onPause={togglePlayPause}
                    />
                    <div id="player-controls">
                        <PlayerControls
                            togglePlayPause={togglePlayPause}
                            isPlaying={isPlaying}
                        />
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Home;
