function Ship(length) {

  function hit() {
    return hitNum += 1;
  }

  function isSunk() {
    return hitNum === length ? true : false
  }

  return {
    length: length,
    hits: hitNum,
    sunk: isSunk(),
  }
};

const ship1 = Ship(3);
console.log(ship1);

module.exports = Ship;