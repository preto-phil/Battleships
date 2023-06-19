const Ship = require('./ship');

test('Ship type = function', () => {
  expect(typeof(Ship)).toBe('function');
})

test('Ship1 type = object', () => {
  const ship1 = Ship('a', 3);
  expect(typeof(ship1)).toBe('object');
})

test('Ship1 is hit 3 times', () => {
  const ship1 = Ship('a', 3);
  ship1.hit();
  ship1.hit();
  ship1.hit();
  expect(ship1.sunk).toEqual(true);
  expect(ship1.hits).toEqual(3);
});

test('Ship1 is hit 2 times', () => {
  const ship1 = Ship('a', 3);
  ship1.hit();
  ship1.hit();
  expect(ship1.sunk).toEqual(false);
  expect(ship1.hits).toEqual(2);
});

test('Ship2 is hit 5 times', () => {
  const ship2 = Ship('a', 5);
  ship2.hit();
  ship2.hit();
  ship2.hit();
  ship2.hit();
  ship2.hit();
  expect(ship2.sunk).toEqual(true);
  expect(ship2.hits).toEqual(5);
});
