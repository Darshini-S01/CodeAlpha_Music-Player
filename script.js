const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const songTitle = document.getElementById('song-title');
const themeToggle = document.getElementById('theme-toggle');
const playlistContainer = document.getElementById('playlist');

const songs = ['song1.mp3', 'song2.mp3', 'song3.mp3'];
let currentSong = 0;

function loadSong(index) {
audio.src = 'songs/' + songs[index];
songTitle.textContent = songs[index].replace('.mp3','');
highlightPlaylist(index);
}

function playSong() {
audio.play();
playBtn.textContent = '⏸';
}

function pauseSong() {
audio.pause();
playBtn.textContent = '▶️';
}

function highlightPlaylist(index) {
document.querySelectorAll('#playlist div').forEach((el, i) => {
el.classList.toggle('active', i === index);
});
}

playBtn.addEventListener('click', () => {
if (audio.paused) playSong(); else pauseSong();
});

nextBtn.addEventListener('click', () => {
currentSong = (currentSong + 1) % songs.length;
loadSong(currentSong);
playSong();
});

prevBtn.addEventListener('click', () => {
currentSong = (currentSong - 1 + songs.length) % songs.length;
loadSong(currentSong);
playSong();
});

audio.addEventListener('timeupdate', () => {
progress.value = (audio.currentTime / audio.duration) * 100;
});

progress.addEventListener('input', () => {
audio.currentTime = (progress.value * audio.duration) / 100;
});

volume.addEventListener('input', () => {
audio.volume = volume.value;
});

themeToggle.addEventListener('click', () => {
document.body.classList.toggle('dark');
themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

songs.forEach((song, i) => {
const div = document.createElement('div');
div.textContent = song.replace('.mp3','');
div.addEventListener('click', () => {
currentSong = i;
loadSong(currentSong);
playSong();
});
playlistContainer.appendChild(div);
});

loadSong(currentSong);
