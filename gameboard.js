class Gameboard {
  constructor() {
      this.ships = [];
      this.misses = [];
      this.hits = [];
      this.attacks = new Set();
  }

  placeShip(x, y, ship) {
      for (let i = 0; i < ship.length; i++) {
          this.ships.push({ x: x, y: y + i, ship });
      }
  }

  receiveAttack(x, y) {
      if (this.attacks.has(`${x},${y}`)) {
          return false;
      }
      this.attacks.add(`${x},${y}`);
      const target = this.ships.find(ship => ship.x === x && ship.y === y);
      if (target) {
          target.ship.hit();
          this.hits.push({ x, y });
          return true;
      } else {
          this.misses.push({ x, y });
          return false;
      }
  }

  allSunk() {
      return this.ships.every(ship => ship.ship.isSunk());
  }
}
