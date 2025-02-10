const states = [
    // England Counties
    { name: "Bedfordshire", country: "England" },
];

let currentState;
let correctGuesses = [];
let incorrectGuesses = 0;
let gameStatus = '';
const maxIncorrectGuesses = 5;

function initGame() {
    const today = new Date();
    const gameIndex = today.getDate() % states.length;
    currentState = states[gameIndex];

    correctGuesses = Array(currentState.name.length).fill('_');
    incorrectGuesses = 0;
    gameStatus = '';

    // Set the image dynamically based on the current state
    const imageContainer = document.getElementById('image-container');
    const imagePath = `images/${currentState.name}.png`;  // Image filename based on state name with .png extension
    imageContainer.innerHTML = `<img src="${imagePath}" alt="${currentState.name}" style="max-width: 100%; height: auto;">`;

    renderGame();
}

function handleGuess() {
    const guessInput = document.getElementById('guess-input');
    const guess = guessInput.value.trim().toLowerCase();  // Normalize guess input
    guessInput.value = '';  // Clear input after submitting

    if (guess && guess.length > 0) {
        const stateName = currentState.name.toLowerCase();
        let correctGuess = false;

        // Check if the full guess is correct (no partial matches)
        if (guess === stateName) {
            correctGuesses = currentState.name.split('');  // Reveal entire state name
            gameStatus = 'You guessed it right!';
            document.getElementById('reload-btn').style.display = 'block';
            document.getElementById('submit-btn').disabled = true;
            renderGame();
            return;
        }

        // Check for correct letters from the guess
        for (let i = 0; i < stateName.length; i++) {
            if (guess.includes(stateName[i])) {
                correctGuesses[i] = currentState.name[i];  // Update matching letter
                correctGuess = true;
            }
        }

        // If the guess is incorrect (i.e., it's not an exact match or partial match)
        if (!correctGuess || guess !== stateName) {
            incorrectGuesses++;
            gameStatus = 'Incorrect guess!';

            if (incorrectGuesses >= maxIncorrectGuesses) {
                gameStatus = `Game over! The correct answer was: ${currentState.name}`;
                document.getElementById('reload-btn').style.display = 'block';
                document.getElementById('submit-btn').disabled = true;
            }
        }

        renderGame();
    }
}

function renderGame() {
    // Update the UI with current game state
    document.getElementById('word-container').innerText = correctGuesses.join(' ');
    document.getElementById('incorrect-guesses').innerText = `Incorrect Guesses: ${incorrectGuesses}/${maxIncorrectGuesses}`;
    document.getElementById('game-status').innerText = gameStatus;
}

document.getElementById('submit-btn').addEventListener('click', handleGuess);
document.getElementById('reload-btn').addEventListener('click', initGame);

window.onload = initGame;
