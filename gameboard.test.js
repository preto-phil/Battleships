const Gameboard = require('./gameboard');
const Ship = require('./ship');


test('Gameboard size = 100', () => {
  const gameboard = Gameboard();
  expect(gameboard.gameBoard.length).toBe(100);
});


test('Horizontal placement: carrier at row 5 and col 0', () => {
  const carrier = Ship('carrier', 5);
  const carrierPlaced = Gameboard()
  carrierPlaced.placeShip(carrier, 5, 0);
  expect(carrierPlaced.gameBoard[50]).toEqual({ row: 5, col: 0, ship: 'carrier', hit: false });
});


test('Hitting a cell: random cell', () => {
  const carrier = Ship('carrier', 5);
  const carrierPlaced = Gameboard();
  
  const randomRow = Math.floor(Math.random() * 10);
  const randomCol = Math.floor(Math.random() * 10);
  const randomNum = Number(`${randomRow}${randomCol}`);

  carrierPlaced.placeShip(carrier, randomRow, randomCol);
  carrierPlaced.gameBoard[randomNum].hit = true;

  expect(carrierPlaced.gameBoard[randomNum]).toEqual({ row: randomRow, col: randomCol, ship: 'carrier', hit: true });
});


/* test('Vertical placement: battleship at row 4 and col 0', () => {
  const battleship = Ship('battleship', 4);
  const battleshipPlaced = Gameboard()
  battleshipPlaced.placeShip(battleship, 4, 0);
  expect(battleshipPlaced.gameBoard[60]).toEqual({ row: 6, col: 0, ship: 'battleship' });
}); */