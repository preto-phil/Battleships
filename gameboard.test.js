const Gameboard = require('./gameboard');

test('Gameboard size = 100', () => {
  expect(Gameboard().length).toBe(100);
});