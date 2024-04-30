class Player {
  constructor(isComputer = false) {
    this.isComputer = isComputer;
    this.gameboard = new Gameboard(); // make sure Gameboard is defined in your project
  }

  performAttack(x, y, gameboard) {
    return gameboard.receiveAttack(x, y);
  }
}