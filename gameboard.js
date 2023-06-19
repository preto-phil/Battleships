import Ship from "./ship";

const Gameboard = () => {
  const gameBoard = [];

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      gameBoard.push({ row, col });
    }
  }

  return gameBoard;
};


function placeShip() {

}



// carrier = 5
// battleship = 4
// destroyer = 3
// submarine = 3
// patrol boat = 2


module.exports = Gameboard;
module.exports = createGameBoard;