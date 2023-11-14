import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <PlaylistProvider>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);