// Get name from URL parameter
const params = new URLSearchParams(window.location.search);
const name = params.get('name');
if (name) {
  document.getElementById('name').textContent = name;
}

// Elements
const card = document.querySelector('.card');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const hint = document.getElementById('hint');
const celebration = document.getElementById('celebration');
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

// Resize canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Escape counter for increasingly desperate behavior
let escapeCount = 0;

// Make the No button escape
function escapeButton() {
  escapeCount++;

  const button = btnNo;

  // Switch to absolute positioning on first escape
  if (!button.classList.contains('escaping')) {
    button.classList.add('escaping');
  }

  const cardRect = card.getBoundingClientRect();
  const buttonRect = button.getBoundingClientRect();

  // Calculate bounds within the card
  const maxX = cardRect.width - buttonRect.width - 40;
  const maxY = cardRect.height - buttonRect.height - 40;

  // Random position within card bounds
  const randomX = Math.random() * maxX - maxX / 2;
  const randomY = Math.random() * maxY / 2;

  button.style.transform = `translate(${randomX}px, ${randomY}px)`;

  // Make button smaller after several escapes
  if (escapeCount > 3) {
    const scale = Math.max(0.5, 1 - (escapeCount - 3) * 0.1);
    button.style.transform = `translate(${randomX}px, ${randomY}px) scale(${scale})`;
  }

  // Update hint text based on escape count
  const hints = [
    '"No" seems a bit shy 🙈',
    'The button is running away! 🏃',
    'You can\'t catch it! 😄',
    'Just click Yes already! 💕',
    'The No button has trust issues 😅',
    'It\'s faster than you think! ⚡',
  ];
  hint.textContent = hints[Math.min(escapeCount, hints.length - 1)];
}

// Event listeners for No button escape
btnNo.addEventListener('mouseenter', escapeButton);
btnNo.addEventListener('touchstart', (e) => {
  e.preventDefault();
  escapeButton();
});
btnNo.addEventListener('click', (e) => {
  e.preventDefault();
  escapeButton();
});

// Celebration GIFs - add more URLs here
const celebrationGifs = [
  'https://media3.giphy.com/media/wvYNSqBAMDVx8CEYkt/giphy.gif',
  'https://media4.giphy.com/media/7k3ThwwMXnHCE/giphy.gif',
  'https://media4.giphy.com/media/9rgVLYnPzzUpLsaaxN/giphy.gif',
  'https://media3.giphy.com/media/D9j761FH8SYJLyW9WO/giphy.gif',
  'https://media4.giphy.com/media/xUOwG00IFPul5BU9Us/giphy.gif',
  'https://media4.giphy.com/media/OGeHosTuPqPsrQIg9k/giphy.gif',
  'https://media4.giphy.com/media/48tJ0SmMHKH4FqV0R9/giphy.gif',
  'https://media1.giphy.com/media/bMLGNRoAy0Yko/giphy.gif',
];

// Yes button click - celebrate!
btnYes.addEventListener('click', () => {
  // Pick a random GIF
  const randomGif = celebrationGifs[Math.floor(Math.random() * celebrationGifs.length)];
  document.querySelector('.celebration-gif').src = randomGif;

  card.classList.add('celebrating');
  celebration.classList.add('show');
  startConfetti();
});

// Confetti animation
const confettiPieces = [];
const colors = ['#e91e63', '#ff4081', '#f50057', '#ff80ab', '#fce4ec', '#ffeb3b', '#4caf50'];

class ConfettiPiece {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = -20;
    this.size = Math.random() * 10 + 5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.speedY = Math.random() * 3 + 2;
    this.speedX = Math.random() * 2 - 1;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 10 - 5;
    this.opacity = 1;
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.rotation += this.rotationSpeed;

    if (this.y > canvas.height + 20) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
    ctx.restore();
  }
}

let animationId = null;

function startConfetti() {
  // Create confetti pieces
  for (let i = 0; i < 150; i++) {
    const piece = new ConfettiPiece();
    piece.y = Math.random() * canvas.height; // Scatter initial positions
    confettiPieces.push(piece);
  }

  animate();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confettiPieces.forEach(piece => {
    piece.update();
    piece.draw();
  });

  animationId = requestAnimationFrame(animate);
}
