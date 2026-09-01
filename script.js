const invitation = document.querySelector('#invitation');
const film = document.querySelector('#film');
const openButton = document.querySelector('#openButton');
const closeButton = document.querySelector('#closeButton');
const soundButton = document.querySelector('#soundButton');
const sparkles = document.querySelector('#sparkles');
const backgroundMusic = document.querySelector('#backgroundMusic');

let muted = false;
let musicTimer;
let currentMusicCycle = 0;
const MUSIC_FRAGMENT_DURATION = 30_000;
const TOTAL_MUSIC_CYCLES = 3;

function createSparkles() {
  if (sparkles.children.length) return;
  for (let index = 0; index < 34; index += 1) {
    const spark = document.createElement('span');
    spark.className = 'spark';
    spark.style.setProperty('--x', `${5 + Math.random() * 90}%`);
    spark.style.setProperty('--y', `${8 + Math.random() * 82}%`);
    spark.style.setProperty('--size', `${1 + Math.random() * 3}px`);
    spark.style.setProperty('--duration', `${3.8 + Math.random() * 4.8}s`);
    spark.style.setProperty('--delay', `${Math.random() * -8}s`);
    spark.style.setProperty('--drift', `${-25 + Math.random() * 50}px`);
    sparkles.appendChild(spark);
  }
}

function startMusic() {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
  backgroundMusic.volume = 0.6;
  backgroundMusic.muted = muted;

  backgroundMusic.play().catch((error) => {
    console.warn('No se pudo reproducir public/audio/musica.mp3.', error);
  });
}

function startMusicCycle() {
  currentMusicCycle += 1;
  startMusic();

  clearTimeout(musicTimer);
  musicTimer = setTimeout(() => {
    if (currentMusicCycle < TOTAL_MUSIC_CYCLES) {
      startMusicCycle();
      return;
    }

    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
  }, MUSIC_FRAGMENT_DURATION);
}

function openInvitation() {
  createSparkles();
  clearTimeout(musicTimer);
  currentMusicCycle = 0;
  invitation.classList.remove('playing');
  void invitation.offsetWidth;
  invitation.classList.add('playing');
  film.setAttribute('aria-hidden', 'false');
  startMusicCycle();
}

function closeInvitation() {
  invitation.classList.remove('playing');
  film.setAttribute('aria-hidden', 'true');
  clearTimeout(musicTimer);
  currentMusicCycle = 0;
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
  openButton.focus();
}

openButton.addEventListener('click', openInvitation);
closeButton.addEventListener('click', closeInvitation);
soundButton.addEventListener('click', () => {
  muted = !muted;
  backgroundMusic.muted = muted;
  soundButton.textContent = muted ? '×' : '♪';
  soundButton.setAttribute('aria-label', muted ? 'Activar sonido' : 'Silenciar sonido');
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && invitation.classList.contains('playing')) closeInvitation();
});
