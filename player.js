class Player {
  constructor(isComputer = false) {
      this.isComputer = isComputer;
      this.gameboard = new Gameboard();
  }

  performAttack(x, y, gameboard) {
      return gameboard.receiveAttack(x, y);
  }

  performComputerAttack(gameboard) {
      let x, y;
      do {
          x = Math.floor(Math.random() * 10);
          y = Math.floor(Math.random() * 10);
      } while (gameboard.attacks.has(`${x},${y}`));
      gameboard.receiveAttack(x, y);
      return [x, y];
  }
}
