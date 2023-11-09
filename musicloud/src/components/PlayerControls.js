import React from 'react';

const PlayerControls = ({ togglePlayPause, isPlaying }) => {
    return (
        <div className="player-controls">
            <button onClick={togglePlayPause}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button>Next</button>
            <button>Previous</button>
        </div>
    );
};

export default PlayerControls;
