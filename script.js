// Get the game status display element and score elements
const statusDisplay = document.querySelector('.game--status');
const playerXScore = document.querySelector('.playerX-score');
const playerOScore = document.querySelector('.playerO-score');

// Initialize game state variables
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let scores = { X: 0, O: 0 };

// Define messages 
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

// Display the current player's turn 
statusDisplay.innerHTML = currentPlayerTurn();

// Add event listeners 
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);

// Function to handle a cell click
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

// Function to handle when a cell is played
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

//Winning Combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//Function to handle the result ( to find whether it is a win or draw )
function handleResultValidation() {
    let roundWon = false;
    
    // Loop through all the winning conditions
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    // If a player won, display the winning message, stop the game and update score
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        updateScore();
        return;
    }

    //Check if there is a draw ( all cells filled without winner )
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    //If no win or draw, change player
    handlePlayerChange();
}

//Function to switch players
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

//Function to update score after win
function updateScore() {
    scores[currentPlayer]++;
    if (currentPlayer === "X") {
        playerXScore.innerHTML = scores.X;
    } else {
        playerOScore.innerHTML = scores.O;
    }
}

//Function to restart the game
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}
