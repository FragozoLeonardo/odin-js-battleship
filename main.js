document.addEventListener('DOMContentLoaded', function() {
  const humanPlayer = new Player();
  const computerPlayer = new Player(true);
  let playerScore = 0;
  let computerScore = 0;

  humanPlayer.gameboard.placeShip(0, 0, new Ship(4));
  humanPlayer.gameboard.placeShip(3, 3, new Ship(3));
  humanPlayer.gameboard.placeShip(5, 5, new Ship(2));
  computerPlayer.gameboard.placeShip(2, 2, new Ship(4));
  computerPlayer.gameboard.placeShip(6, 6, new Ship(3));
  computerPlayer.gameboard.placeShip(1, 7, new Ship(2));

  renderBoard(humanPlayer.gameboard, document.getElementById('player-board'));
  renderBoard(computerPlayer.gameboard, document.getElementById('computer-board'));
  updateScore();

  document.getElementById('computer-board').addEventListener('click', function(e) {
      if (e.target.classList.contains('cell')) {
          const x = parseInt(e.target.dataset.x, 10);
          const y = parseInt(e.target.dataset.y, 10);
          if (humanPlayer.performAttack(x, y, computerPlayer.gameboard)) {
              renderBoard(computerPlayer.gameboard, document.getElementById('computer-board'));
              if (computerPlayer.gameboard.hits.some(hit => hit.x === x && hit.y === y)) {
                  playerScore++;
              }
              if (computerPlayer.gameboard.allSunk()) {
                  alert("You win!");
              }
              setTimeout(() => {
                  const [compX, compY] = computerPlayer.performComputerAttack(humanPlayer.gameboard);
                  renderBoard(humanPlayer.gameboard, document.getElementById('player-board'));
                  if (humanPlayer.gameboard.hits.some(hit => hit.x === compX && hit.y === compY)) {
                      computerScore++;
                  }
                  updateScore();
                  if (humanPlayer.gameboard.allSunk()) {
                      alert("Computer wins!");
                  }
              }, 1000);
              updateScore();
          }
      }
  });

  function updateScore() {
      document.getElementById('score').textContent = `Player Score: ${playerScore} - Computer Score: ${computerScore}`;
  }
});

function renderBoard(gameboard, element) {
  element.innerHTML = '';

  for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
          const cell = document.createElement('div');
          cell.className = 'cell';
          cell.dataset.x = i;
          cell.dataset.y = j;

          cell.classList.add('unrevealed');

          if (gameboard.hits.some(hit => hit.x === i && hit.y === j)) {
              cell.classList.remove('unrevealed');
              cell.classList.add('hit');
          } else if (gameboard.misses.some(miss => miss.x === i && miss.y === j)) {
              cell.classList.remove('unrevealed');
              cell.classList.add('miss');
          }

          element.appendChild(cell);
      }
  }
}
