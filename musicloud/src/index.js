import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const PlaylistProvider = require('./components/PlaylistContext').PlaylistProvider;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>

    
<PlaylistProvider>
      <App />
    </PlaylistProvider>
  </React.StrictMode>, // Add missing closing bracket here
  document.getElementById('root')
);