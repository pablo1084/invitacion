const invitation = document.querySelector('#invitation');
const film = document.querySelector('#film');
const openButton = document.querySelector('#openButton');
const closeButton = document.querySelector('#closeButton');
const soundButton = document.querySelector('#soundButton');
const sparkles = document.querySelector('#sparkles');

let audioContext;
let masterGain;
let muted = false;
let endTimer;

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

function startAmbientSound() {
  audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
  masterGain = audioContext.createGain();
  masterGain.gain.setValueAtTime(muted ? 0 : 0.12, audioContext.currentTime);
  masterGain.connect(audioContext.destination);

  const notes = [130.81, 196, 261.63, 329.63, 392, 329.63, 261.63, 196];
  notes.forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    const start = audioContext.currentTime + index * 3;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(.35, start + 1.1);
    gain.gain.exponentialRampToValueAtTime(.001, start + 4.2);
    oscillator.connect(gain).connect(masterGain);
    oscillator.start(start);
    oscillator.stop(start + 4.3);
  });
}

function openInvitation() {
  createSparkles();
  invitation.classList.remove('playing');
  void invitation.offsetWidth;
  invitation.classList.add('playing');
  film.setAttribute('aria-hidden', 'false');
  startAmbientSound();
  clearTimeout(endTimer);
  endTimer = setTimeout(() => closeButton.focus(), 25000);
}

function closeInvitation() {
  invitation.classList.remove('playing');
  film.setAttribute('aria-hidden', 'true');
  clearTimeout(endTimer);
  if (audioContext) audioContext.close();
  audioContext = null;
  openButton.focus();
}

openButton.addEventListener('click', openInvitation);
closeButton.addEventListener('click', closeInvitation);
soundButton.addEventListener('click', () => {
  muted = !muted;
  if (masterGain && audioContext) masterGain.gain.setTargetAtTime(muted ? 0 : .12, audioContext.currentTime, .08);
  soundButton.textContent = muted ? '×' : '♪';
  soundButton.setAttribute('aria-label', muted ? 'Activar sonido' : 'Silenciar sonido');
});
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && invitation.classList.contains('playing')) closeInvitation(); });
