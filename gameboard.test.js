const Gameboard = require('./gameboard');

test('Gameboard size = 100', () => {
  const gameboard = Gameboard();
  expect(gameboard.gameBoard.length).toBe(100);
});

/* 
test('Ship at row 5 and col 0', () => {
  const carrier = Ship(5);
  const battleship = Ship(4);
  const destroyer = Ship(3);
  const submarine = Ship(3);
  const patrolBoat = Ship(2);
  const car = Gameboard.placeShip(carrier, 5, 0);
  expect(car.gameBoard[50]).toBe({ row: 5, col: 0, ship});
}); */