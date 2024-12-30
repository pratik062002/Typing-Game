const textDisplay = document.getElementById('text-display');
const inputField = document.getElementById('input-field');
const timerDisplay = document.getElementById('timer');
const wpmDisplay = document.getElementById('wpm');
const restartBtn = document.getElementById('restart-btn');
const stopBtn = document.getElementById('stop-btn');

const paragraphs = [
    "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet.",
    "Programming is the art of telling another human what one wants the computer to do.",
    "The only way to learn a new programming language is by writing programs in it.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "I love the smell of coffee in the morning. It's the aroma of fresh ideas and productivity."
];

let timer;
let timeLeft = 60;
let currentParagraph = '';
let startTime;
let endTime;
let gameInProgress = false;

function startGame() {
    timeLeft = 60;
    currentParagraph = paragraphs[Math.floor(Math.random() * paragraphs.length)];
    textDisplay.innerHTML = currentParagraph;
    inputField.value = '';
    inputField.disabled = false;
    inputField.focus();
    startTime = new Date();
    timer = setInterval(updateTimer, 1000);
    restartBtn.style.display = 'none';
    stopBtn.style.display = 'block';
    gameInProgress = true;
}

function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}s`;
    if (timeLeft === 0) {
        endGame();
    }
}

function endGame() {
    clearInterval(timer);
    inputField.disabled = true;
    gameInProgress = false;
    calculateWPM();
    restartBtn.style.display = 'block';
    stopBtn.style.display = 'none';
}

function calculateWPM() {
    endTime = new Date();
    const totalTime = (endTime - startTime) / 60000; // Convert to minutes
    const wordsTyped = inputField.value.trim().split(/\s+/).length;
    const wpm = Math.round(wordsTyped / totalTime);
    wpmDisplay.textContent = `WPM: ${wpm}`;
}

function stopGame() {
    if (gameInProgress) {
        endGame();
    }
}

inputField.addEventListener('input', () => {
    const arrayParagraph = currentParagraph.split('');
    const arrayValue = inputField.value.split('');
    
    let content = '';
    arrayParagraph.forEach((char, index) => {
        if (arrayValue[index] == null) {
            content += `<span>${char}</span>`;
        } else if (char === arrayValue[index]) {
            content += `<span class="correct">${char}</span>`;
        } else {
            content += `<span class="incorrect">${char}</span>`;
        }
    });
    
    textDisplay.innerHTML = content;
    
    // Calculate WPM in real-time
    if (gameInProgress) {
        calculateWPM();
    }
});

restartBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', stopGame);

startGame();