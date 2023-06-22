const Gameboard = require('./gameboard');
const Ship = require('./ship');


test('Gameboard size = 100', () => {
  const gameboard = Gameboard();
  expect(gameboard.gameBoard.length).toBe(100);
});


test('Horizontal placement: carrier at row 5 and col 0', () => {
  const carrier = Ship('carrier', 5);
  const gameboard = Gameboard()
  gameboard.placeShip(carrier, 5, 0, 'horizontal');
  expect(gameboard.gameBoard[51].row).toEqual(5);
  expect(gameboard.gameBoard[51].col).toEqual(1);
  expect(gameboard.gameBoard[51].ship.name).toEqual('carrier');
  expect(gameboard.gameBoard[51].hit).toEqual(false);
});


test('Hitting a cell: 5 0 cell', () => {
  const carrier = Ship('carrier', 5);
  const gameboard = Gameboard();


  gameboard.placeShip(carrier, 5, 0, 'vertical');
  gameboard.receiveAttack(50);

  expect(gameboard.gameBoard[50].hit).toEqual(true);
  expect(carrier.hits).toEqual(1);
});




test('Test double placement: ship overlapping', () => {
  const battleship = Ship('battleship', 4);
  const submarine = Ship('submarine', 3)
  const gameboard = Gameboard()
  gameboard.placeShip(battleship, 4, 0, 'horizontal');

  expect(() => gameboard.placeShip(submarine, 4, 2, 'horizontal')).toThrow('Ship placement overlapping');
});