// import Ship from "./ship";
const Ship = require('./ship');

const Gameboard = () => {
  const gameBoard = [];

  function createGameBoard() {
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        gameBoard.push({ row, col, ship: null, hit: false });
      }
    }
  }

  function placeShip(shipName, row, col, axis) {
    const index = row * 10 + col;
    const increment = axis === 'horizontal' ? 1 : 10;
  
    
    for (let i = 0; i < shipName.length; i++) {
/*       const cell = gameBoard[index + i * increment];*/
      gameBoard[index + i * increment].ship = `${shipName.name}`;
    }

  }

  function attack(x) {
    gameBoard[x].hit = true;
    return gameBoard[x];
  }

  createGameBoard();

  return { 
    gameBoard,
    placeShip,
    attack
  }

};

/* function attack() {
  let x = Math.floor(Math.random() * 100)
  gameBoard[x].hit = true;
} */


function receiveAttack() {
  // Needs to take a random coordinate
  // Pick a random number between 0 and 100
  // let number = Math.floor(math.random() * 100)
  // if cell already hit then go again ---- while
  // bv. while (this array hitStatus === hit) { get random number }

  // change hit status to hit
  // if ship object value not null
  // then call function that changes hit number of ship
  // bv carrier.hit() /// ship name .hit()


  // if hit then hit is added to either object in gameBoard array
      // necessary to know which cells are hit
      // prevent from choosing same array item twice
      // conditional statement
  // or 
}

/* 
Function that keeps tab of whether all ships equal to sunk

if (thisShip.sunk === true && all the others sunk)
or use array method that test each array items sunk function
*/

// Should we place all the ships into an array

let shipArray = []

const carrier = Ship('carrier', 5);
const battleship = Ship('battleship', 4);
const destroyer = Ship('destroyer', 3);
const submarine = Ship('submarine', 3);
const patrolBoat = Ship('patrolBoat', 2);

shipArray.push(carrier, battleship, destroyer, submarine, patrolBoat);

module.exports = Gameboard;
