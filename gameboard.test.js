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



/* test('Vertical placement: battleship at row 4 and col 0', () => {
  const battleship = Ship('battleship', 4);
  const battleshipPlaced = Gameboard()
  battleshipPlaced.placeShip(battleship, 4, 0);
  expect(battleshipPlaced.gameBoard[60]).toEqual({ row: 6, col: 0, ship: 'battleship' });
}); */