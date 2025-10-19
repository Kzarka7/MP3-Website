// Keeps track of which track is currently playing
let currentTrackIndex = 0;

// DOM elements for audio and UI updates
const song = document.getElementById("song");
const rightCover = document.querySelector(".right img");
const rightTitle = document.querySelector(".right h2");
const rightArtist = document.querySelector(".right p");

function loadTrack(index, autoplay = true) {
    if (!playlist || playlist.length === 0) return;

    currentTrackIndex = index;
    const track = playlist[index];

    // Update audio player and right panel info
    song.src = track.src;
    rightCover.src = track.cover;
    rightTitle.textContent = track.title;
    rightArtist.textContent = track.artist;

    updateActiveRow(index);

    if (autoplay) {
        song.play().catch(() => {});
    }
}

// Makes you choose other songs
function setupTracklist() {
    const trackRows = document.querySelectorAll(".track-row:not(.header)");

    trackRows.forEach((row, index) => {
        row.addEventListener("click", () => {
            loadTrack(index);
        });
    });
}

// Auto play next track
function playNext() {
    let nextIndex = currentTrackIndex + 1;

    if (nextIndex >= playlist.length) {
        nextIndex = 0;
    }

    loadTrack(nextIndex);
}   

function updateActiveRow(index) {
    const trackRows = document.querySelectorAll(".track-row:not(.header)");

    trackRows.forEach((row, i) => {
        const numDiv = row.querySelector(".track-num");
        const titleDiv = row.querySelector(".track-title .title");
        numDiv.textContent = i + 1;
        

        if (i === index) {
            row.classList.add("active");
            titleDiv.classList.add("active");  
        } else {
            row.classList.remove("active");
            titleDiv.classList.remove("active"); 
        }
    });
}

window.addEventListener("DOMContentLoaded", () => {
    if (typeof playlist !== "undefined" && playlist.length > 0) {
        loadTrack(0, false);
    }

    setupTracklist();

    song.addEventListener("ended", playNext);
});