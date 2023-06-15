function Ship(length) {

  function hit() {
    return this.hits += 1;
  }

  function isSunk() {
    return this.sunk = this.hits === length ? true : false;
  }

  return {
    length: length,
    hits: 0,
    hit,
    isSunk,
    sunk: isSunk(),
  }
};

const ship1 = Ship(3);
console.log(ship1);

module.exports = Ship;
