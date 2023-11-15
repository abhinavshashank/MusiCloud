import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const PlaylistProvider = require('./components/PlaylistContext').PlaylistProvider;

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>

    
<PlaylistProvider>
      <App />
    </PlaylistProvider>
  </React.StrictMode>, 
  document.getElementById('root')
);