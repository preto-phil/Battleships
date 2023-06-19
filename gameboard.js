// import Ship from "./ship";
const Ship = require('./ship');

const Gameboard = () => {
  const gameBoard = [];

  function createGameBoard() {
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        gameBoard.push({ row, col, ship: null });
      }
    }
  }

  function placeShip(ship, row, col) {
    // Validation
  
  
    
    for (let i = 0; i < ship.length; i++) {
      // if horizontal
      const cell = gameBoard[row * 10 + col + i]
      // if vertical
      // const cell = gameBoard[row * 10 + col + i * 10]

      cell.ship = `${ship.name}`;
    }

  }

  createGameBoard();

  return { 
    gameBoard,
    placeShip
  }

};

const carrier = Ship('carrier', 5);
const battleship = Ship('battleship', 4);
const destroyer = Ship('destroyer', 3);
const submarine = Ship('submarine', 3);
const patrolBoat = Ship('patrolBoat', 2);

module.exports = Gameboard;