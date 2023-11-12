

// function App() {
//   return (
//     <Router>
//       <PlaylistProvider>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/upload" element={<UploadSong />} />
//           <Route path="/search" element={<Search />} />
//           <Route path="/my-songs" element={<MySongs />} />
//         </Routes>
//       </PlaylistProvider>
//     </Router>
//   );
// }

// export default App;

//App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { PlaylistProvider } from './components/PlaylistContext';
import Layout from './components/Layout';
import Home from './components/home';
import Signup from './components/signup';
import Login from './components/login';
import UploadSong from './components/UploadSong';
import Search from './components/search';
import MySongs from './components/mysongs';


function App() {
  return (
    <Router>
      <PlaylistProvider>
        
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/upload" element={<UploadSong />} />
            <Route path="/search" element={<Search />} />
            <Route path="/my-songs" element={<MySongs />} />
          </Routes>
        
        
      </PlaylistProvider>
    </Router>
  );
}

export default App;


// function App() {
//   return (
//     <Router>
//       <PlaylistProvider>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route
//             path="/app*"
//             element={
//               <Layout>
//                 <Routes>
//                   <Route path="/home" element={<Home />} />
//                   <Route path="/my-songs" element={<MySongs />} />
//                   <Route path="/upload" element={<Upload />} />
//                   <Route path="/search" element={<Search />} />
//                 </Routes>
//               </Layout>
//             }
//           />
//         </Routes>
//       </PlaylistProvider>
//     </Router>
//   );
// }

// export default App;

