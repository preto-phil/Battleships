const Gameboard = require('./gameboard');
const Ship = require('./ship');


test('Gameboard size = 100', () => {
  const gameboard = Gameboard();
  expect(gameboard.gameBoard.length).toBe(100);
});


test('Ship at row 5 and col 0', () => {
  const carrier = Ship('carrier', 5);
  const battleship = Ship(4);
  const destroyer = Ship(3);
  const submarine = Ship(3);
  const patrolBoat = Ship(2);
  const carrierPlaced = Gameboard()
  carrierPlaced.placeShip(carrier, 5, 0);
  expect(carrierPlaced.gameBoard[50]).toEqual({ row: 5, col: 0, ship: 'carrier' });
});