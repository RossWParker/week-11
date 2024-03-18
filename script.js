// Initialize variables
let currentPlayer = 'X'; // Player X starts the game
let moves = ['', '', '', '', '', '', '', '', '']; // Array to track player moves
let gameActive = true; // Flag to track game status
let scoreX = 0; // Player X's score
let scoreO = 0; // Player O's score

// Function to make a move in a cell
function makeMove(index) {
  // Check if the game is active and the cell is empty
  if (gameActive && moves[index] === '') {
    // Set the move for the current player
    moves[index] = currentPlayer;
    // Update the cell with the current player's mark
    document.querySelectorAll('.cell')[index].innerText = currentPlayer;
    // Check for a winner
    checkWinner();
    // Toggle to the next player
    togglePlayer();
  }
}

// Function to toggle between players
function togglePlayer() {

  // Switch player turn
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  // Update turn display
  document.querySelector('.turn').innerText = currentPlayer + "'s Turn";
}

// Function to check for a winner
function checkWinner() {

  // Define winning conditions
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

  // Iterate through winning conditions
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    // Check if there is a winner
    if (moves[a] && moves[a] === moves[b] && moves[a] === moves[c]) {
      // Game is no longer active
      gameActive = false;
      // Hide the turn display
      document.querySelector('.turn').innerText = '';
      // Announce the winner
      document.querySelector('#winner-alert').innerText = currentPlayer + " Wins!";
      document.querySelector('#winner-alert').style.display = 'block';
      // Update the winner's score
      updateScore(currentPlayer);
      // Mark the winning cells with a strike-through line
      markWinningCells(a, b, c);
      return;
    }
  }

  // Check for a draw
  if (!moves.includes('')) {
    // Game is no longer active
    gameActive = false;
    // Hide the turn display
    document.querySelector('.turn').innerText = '';
    // Announce a draw
    document.querySelector('#winner-alert').innerText = "It's a Draw!";
    document.querySelector('#winner-alert').className = 'alert alert-info';
    document.querySelector('#winner-alert').style.display = 'block';
  }
}

// Function to mark winning cells with a strike-through line
function markWinningCells(a, b, c) {
  // Calculate indexes of winning cells
  const winningIndexes = [a, b, c];
  // Apply strike-through style to winning cells
  winningIndexes.forEach(index => {
    document.querySelectorAll('.cell')[index].style.textDecoration = 'line-through';
  });
}

// Function to update the winner's score
function updateScore(player) {
  if (player === 'X') {
    scoreX++;
    document.getElementById('scoreX').innerText = scoreX;
  } else if (player === 'O') {
    scoreO++;
    document.getElementById('scoreO').innerText = scoreO;
  }
}

// Function to restart the game
function restartGame() {

  // Reset variables
  currentPlayer = 'X';
  moves = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;

  // Reset the turn display
  document.querySelector('.turn').innerText = "X's Turn";
  
  // Clear all cells
  document.querySelectorAll('.cell').forEach(cell => {
    cell.innerText = '';
    cell.style.textDecoration = 'none';
  });
  // Hide the winner alert
  document.querySelector('#winner-alert').style.display = 'none';
}





