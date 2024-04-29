class Player {
  constructor(isComputer = false) {
    this.isComputer = isComputer;
    this.gameboard = new Gameboard();
  }

  performAttack(x, y, enemyBoard) {
    if (!this.isComputer) {
      return enemyBoard.receiveAttack(x, y);
    } else {
      let validAttack = false;
      do {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        validAttack = enemyBoard.receiveAttack(x, y);
      } while (!validAttack);
      return validAttack;
    }
  }
}