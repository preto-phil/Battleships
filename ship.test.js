const Ship = require('./ship');

test('Create a ship with length 4, hit 0, not sunk', () => {
  expect(Ship(4)).toStrictEqual({
    length: 4,
    hits: 0,
    sunk: false,
  })
});

test('Ship type = function', () => {
  expect(typeof(Ship)).toBe('function');
})

test('Create a new ship with a length 3, hit 0, not sunk', () => {
  const ship1 = Ship(3);
  expect(ship1).toStrictEqual({
    length: 3,
    hits: 0,
    sunk: false,
  })
});

