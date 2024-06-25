let sequence = [];
let playerSequence = [];
let images = [
  
  
  '../lolita/images/3_marco_müller_-_sonnenlicht.jpg',
  '../lolita/images/1366_768_161014207.jpg',
   '../lolita/images/3_marco_müller_-_sonnenlicht_2.jpg',
  '../lolita/images/open_skies-wallpaper-1600x900.jpg',
  '../lolita/images/nature_0071.jpg',
  '../lolita/images/nature_0059.jpg',
  '../lolita/images/1_ianrdjohnson_springintheadelaidehills.jpg',
  '../lolita/images/beautiful_landscape-wide.jpg',
];
let round = 1;
let playing = false;

function startGame() {
  if (playing) return;
  playing = true;
  sequence = [];
  playerSequence = [];
  round = 1;
  playRound();
}

function playRound() {
  updateMessage(`Round ${round} - Memorize the pattern`);
  setTimeout(() => {
    addToSequence();
    animateSequence();
  }, 1000);
}

function addToSequence() {
  let randomIndex = Math.floor(Math.random() * images.length);
  sequence.push(randomIndex);
}

function animateSequence() {
  let i = 0;
  let interval = setInterval(() => {
    showCard(sequence[i]);
    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
      updateMessage(`Repeat the sequence`);
    }
  }, 1000);
}

function showCard(index) {
  let card = document.getElementById(`card-${index}`);
  card.style.backgroundImage = `url(${images[index]})`;
  setTimeout(() => {
    card.style.backgroundImage = '';
  }, 500);
}

function handleClick(cardIndex) {
  if (!playing) return;
  playerSequence.push(cardIndex);
  showCard(cardIndex);
  
  if (playerSequence.length === sequence.length) {
    checkSequence();
  }
}

function checkSequence() {
  for (let i = 0; i < sequence.length; i++) {
    if (sequence[i] !== playerSequence[i]) {
      gameOver();
      return;
    }
  }
  playerSequence = [];
  round++;
  setTimeout(playRound, 1000);
}

function gameOver() {
  playing = false;
  updateMessage(`Game Over! You reached round ${round}`);
}

function updateMessage(msg) {
  document.getElementById('message').textContent = msg;
}

// Creating game board dynamically
const gameBoard = document.getElementById('gameBoard');
for (let i = 0; i < images.length; i++) {
  let card = document.createElement('div');
  card.className = 'card';
  card.id = `card-${i}`;
  card.addEventListener('click', () => handleClick(i));
  gameBoard.appendChild(card);
}