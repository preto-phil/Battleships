const Ship = require('./ship');

/* test('Create a ship with length 4, hit 0, not sunk', () => {
  expect(Ship(4)).toEqual({
    length: 4,
    hits: 0,
    sunk: false,
    hit:   function hit() {
      this.hits += 1;
      this.sunk = this.isSunk();
    },
    isSunk: function isSunk() {
      return this.hits === this.length;
    },
  })
}); */

test('Ship type = function', () => {
  expect(typeof(Ship)).toBe('function');
})

/* test('Create a new ship with a length 3, hit 0, not sunk', () => {
  const ship1 = Ship(3);
  expect(ship1).toEqual({
    length: 3,
    hits: 0,
    sunk: false,
    hit: hit(),
    isSunk: isSunk(),
  })
});
 */

test('Ship1 is hit 3 times', () => {
  const ship1 = Ship(3);
  ship1.hit();
  ship1.hit();
  ship1.hit();
  expect(ship1.sunk).toEqual(true);
  expect(ship1.hits).toEqual(3);
});

test('Ship1 is hit 2 times', () => {
  const ship1 = Ship(3);
  ship1.hit();
  ship1.hit();
  expect(ship1.sunk).toEqual(false);
  expect(ship1.hits).toEqual(2);
});

test('Ship2 is hit 5 times', () => {
  const ship2 = Ship(5);
  ship2.hit();
  ship2.hit();
  ship2.hit();
  ship2.hit();
  ship2.hit();
  expect(ship2.sunk).toEqual(true);
  expect(ship2.hits).toEqual(5);
});
