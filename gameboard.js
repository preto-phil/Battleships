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

  function placeShip(ship, row, col, axis) {
    const index = row * 10 + col;
    const increment = axis === 'horizontal' ? 1 : 10;
    
    if (
      (axis === 'horizontal' && index >= (100 - ship.length + 1)) ||
      (axis === 'vertical' && index >= (100 - ship.length * 10 + 10))
    ) {
      throw new Error('Ship placement out of bounds');
    }

    for (let i = 0; i < ship.length; i++) {
      let horNum = index + i;
      let verNum = index + i * 10;
      if (
        (axis === 'horizontal' && gameBoard[horNum].ship !== null) ||
        (axis === 'vertical' && gameBoard[verNum].ship !== null)
      ) {
        throw new Error('Ship placement overlapping');
      } else {
        const cell = gameBoard[index + i * increment];
        cell.ship = ship;
      }
    }
  }

  function cpuPlaceShip(ship, row, col, axis) {
    const index = row * 10 + col;
    const increment = axis === 'horizontal' ? 1 : 10;
    
    if (
      (axis === 'horizontal' && index >= (100 - ship.length + 1)) ||
      (axis === 'vertical' && index >= (100 - ship.length * 10 + 10))
    ) {
      cpuGameboard.cpuGB = '';
      cpuGameboard.cpuShipPlacement();
    }

    for (let i = 0; i < ship.length; i++) {
      let horNum = index + i;
      let verNum = index + i * 10;
      if (
        (axis === 'horizontal' && gameBoard[horNum].ship !== null) ||
        (axis === 'vertical' && gameBoard[verNum].ship !== null)
      ) {
        throw new Error('Ship placement overlapping');
      } else {
        const cell = gameBoard[index + i * increment];
        cell.ship = ship;
      }
    }
  }

  function receiveAttack(x) {
    // if statement added so that code can run in tests for specific numbers
    if (x === undefined) {
      let randomNum = Math.floor(Math.random() * 100);
      while (gameBoard[randomNum].hit === true) {
        randomNum = Math.floor(Math.random() * 100);
      }
      if (gameBoard[randomNum].ship !== null) {
          let shipName = gameBoard[randomNum].ship;
          shipName.hit();      
          console.log(shipName)
      }
      return gameBoard[randomNum].hit = true;
    } else {
      gameBoard[x].hit = true;
      if (gameBoard[x].ship !== null) {
        let shipName = gameBoard[x].ship;
        shipName.hit();
        console.log(shipName)
      }
      return gameBoard[x];
    }
  }

  // if all ships === sunk then gameOver


  createGameBoard();

  return { 
    gameBoard,
    placeShip,
    cpuPlaceShip,
    receiveAttack
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

const cpuGameboard = () => {
  let cpuGB = Gameboard();

  cpuGB();



  function cpuShipPlacement() {
    shipArray.forEach(ship => {
      let rCol = Math.floor(Math.random() * 10);
      let rRow = Math.floor(Math.random() * 10);
      let axis = Math.floor(Math.random() * 2) === 1 ? 'horizontal' : 'vertical';
      cpuGB.cpuPlaceShip(ship, rCol, rRow, axis)
    })
  }

  cp

  // if error - remove gameboard / cpuGB = ''
  // rerun shipArray.forEach

  return {
    cpuGB,
    cpuShipPlacement
  }

}

cpuGameboard();

module.exports = Gameboard;




