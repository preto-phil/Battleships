function Ship(length) {

  function hit() {
    this.hits += 1;
    this.sunk = this.isSunk();
  }

  function isSunk() {
    return this.hits === this.length;
  }

  return {
    length,
    hits: 0,
    sunk: false,
    hit,
    isSunk,
  }
};
/* 
const ship1 = Ship(3);
console.log(ship1); */

module.exports = Ship;
