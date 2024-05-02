document.addEventListener('DOMContentLoaded', function() {
  const humanPlayer = new Player();
  const computerPlayer = new Player(true);

  humanPlayer.gameboard.placeShip(0, 0, new Ship(4));
  computerPlayer.gameboard.placeShip(2, 2, new Ship(3));

  renderBoard(humanPlayer.gameboard, document.getElementById('player-board'));
  renderBoard(computerPlayer.gameboard, document.getElementById('computer-board'));

  document.getElementById('computer-board').addEventListener('click', function(e) {
      if (e.target.classList.contains('cell')) {
          const x = parseInt(e.target.dataset.x, 10);
          const y = parseInt(e.target.dataset.y, 10);
          if (humanPlayer.performAttack(x, y, computerPlayer.gameboard)) {
              renderBoard(computerPlayer.gameboard, document.getElementById('computer-board'));
              if (computerPlayer.gameboard.allSunk()) {
                  alert("You win!");
              }
              setTimeout(() => {
                  computerPlayer.performAttack(humanPlayer.gameboard);
                  renderBoard(humanPlayer.gameboard, document.getElementById('player-board'));
                  if (humanPlayer.gameboard.allSunk()) {
                      alert("Computer wins!");
                  }
              }, 1000);
          }
      }
  });
});

function renderBoard(gameboard, element) {
  element.innerHTML = '';

  // Assuming gameboard should have hits and misses arrays initialized, check them
  if (!Array.isArray(gameboard.hits) || !Array.isArray(gameboard.misses)) {
      console.error('Gameboard misses or hits properties are not initialized as arrays.');
      return; // Stop execution as there is a critical problem
  }

  for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
          const cell = document.createElement('div');
          cell.className = 'cell';
          cell.dataset.x = i;
          cell.dataset.y = j;

          if (gameboard.hits.some(hit => hit.x === i && hit.y === j)) {
              cell.classList.add('hit');
          } else if (gameboard.misses.some(miss => miss.x === i && miss.y === j)) {
              cell.classList.add('miss');
          }

          element.appendChild(cell);
      }
  }
}