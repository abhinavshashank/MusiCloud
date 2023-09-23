const audioPlayer = document.getElementById("audio-player");
const playPauseButton = document.getElementById("play-pause-button");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

let isPlaying = false;

function togglePlayPause() {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseButton.textContent = "Play";
    } else {
        audioPlayer.play();
        playPauseButton.textContent = "Pause";
    }
    isPlaying = !isPlaying;
}

playPauseButton.addEventListener("click", togglePlayPause);

// Implement functionality for next and previous buttons
prevButton.addEventListener("click", () => {
    // Logic to play the previous song
    // Update audio source and play the previous song
});

nextButton.addEventListener("click", () => {
    // Logic to play the next song
    // Update audio source and play the next song
});
