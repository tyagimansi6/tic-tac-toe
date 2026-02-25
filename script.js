// 1. Select the elements from your HTML
const startBtn = document.getElementById('startBtn');
const startScreen = document.getElementById('startScreen');
const playerNameInput = document.getElementById('playerName');

// 2. Game State Variables
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// 3. The "Trigger" - This runs as soon as the button is clicked
startBtn.addEventListener('click', () => {
    const name = playerNameInput.value.trim();
    
    if (name === "") {
        alert("Please enter your name to start the game! ✨");
        return;
    }

    // Hide the start screen
    startScreen.style.display = 'none';

    // Create and Show the Game Board
    launchGame(name);
});

// 4. Function to build the game UI dynamically
function launchGame(name) {
    const gameHTML = `
        <div id="gameContainer" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; color: white;">
            <h2 id="statusText" style="margin-bottom: 20px; font-size: 28px;">${name}'s Turn (X)</h2>
            <div id="board" style="display: grid; grid-template-columns: repeat(3, 100px); gap: 10px; background: #ff9ecb; padding: 10px; border-radius: 15px;">
                ${gameState.map((_, i) => `<div class="cell" data-index="${i}" style="width: 100px; height: 100px; background: white; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 40px; color: #ff85bf; cursor: pointer;"></div>`).join('')}
            </div>
            <button id="resetBtn" style="margin-top: 30px; padding: 10px 20px; border-radius: 12px; border: none; background: white; color: #ff85bf; font-weight: bold; cursor: pointer;">Restart</button>
        </div>
    `;
    
    document.body.innerHTML = gameHTML; // Replaces the start screen with the game

    // Attach click events to the new cells
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', handleMove);
    });

    document.getElementById('resetBtn').addEventListener('click', () => location.reload());
}

// 5. Logic for placing X and O
function handleMove(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (gameState[index] !== "" || !gameActive) return;

    gameState[index] = currentPlayer;
    cell.innerText = currentPlayer;
    
    checkWinner();
}

function checkWinner() {
    let won = false;
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            won = true;
            break;
        }
    }

    const status = document.getElementById('statusText');
    if (won) {
        status.innerText = `Congratulations! ${currentPlayer} Wins! 🎀`;
        gameActive = false;
    } else if (!gameState.includes("")) {
        status.innerText = "It's a tie! 🧸";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        status.innerText = `Turn: ${currentPlayer}`;
    }
}