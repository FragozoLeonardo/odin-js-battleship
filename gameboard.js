class Gameboard {
  constructor() {
    this.ships = [];
    this.misses = [];
    this.attacks = new Set();
  }

  placeShip(x, y, ship) {
    this.ships.push({ x, y, ship });
  }

  receiveAttack(x, y) {
    if (this.attacks.has(`${x},${y}`)) {
      return false;
    }

    this.attacks.add(`${x},${y}`);
    const hitShip = this.ships.find(s => s.x === x && s.y === y);

    if (hitShip) {
      hitShip.ship.hit();
    } else {
      this.misses.push({ x, y });
    }
    return true;
  }

  allSunk() {
    return this.ships.every(ship => ship.ship.isSunk());
  }
}