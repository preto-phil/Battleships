import Ship from "./ship";

const Gameboard = () => {
  const gameBoard = [];

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      gameBoard.push({ row, col, ship: null });
    }
  }

  function placeShip() {
    const length = 3;
    
  /*   const ship = Ship(length); */
  
    let coordinates = 50;
  
    for (let i = 0; i < length; i++) {
      let x = coordinates + i;
      gameBoard[x].ship = 'ship';
    }
  
  }

  placeShip();

  return gameBoard;
};


// carrier = 5
// battleship = 4
// destroyer = 3
// submarine = 3
// patrol boat = 2


module.exports = Gameboard;
module.exports = createGameBoard;