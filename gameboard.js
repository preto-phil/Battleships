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
    // debugger;
    if (
      (axis === 'horizontal' && index >= (100 - ship.length + 1)) ||
      (axis === 'vertical' && index >= (100 - ship.length * 10 + 10))
    ) {
      cpu = '';
      cpu = Gameboard();
      cpuShipPlacement();
    }

    for (let i = 0; i < ship.length; i++) {
      let horNum = index + i;
      let verNum = index + i * 10;
      if (
        (axis === 'horizontal' && gameBoard[horNum].ship !== null) ||
        (axis === 'vertical' && gameBoard[verNum].ship !== null)
      ) {
        cpu = '';
        cpu = Gameboard();
        cpuShipPlacement();
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



/* 
Function that keeps tab of whether all ships equal to sunk

if (thisShip.sunk === true && all the others sunk)
or use array method that test each array items sunk function
*/


/* Creating the CPU Gameboard and placing its ships */

let cpu = Gameboard();

let cpuShipArray = []

const cpuCarrier = Ship('cpuCarrier', 5);
const cpuBattleship = Ship('cpuBattleship', 4);
const cpuDestroyer = Ship('cpuDestroyer', 3);
const cpuSubmarine = Ship('cpuSubmarine', 3);
const cpuPatrolBoat = Ship('cpuPatrolBoat', 2);

cpuShipArray.push(cpuCarrier, cpuBattleship, cpuDestroyer, cpuSubmarine, cpuPatrolBoat);

function cpuShipPlacement() {
cpuShipArray.forEach(ship => {
  let rCol = Math.floor(Math.random() * 10);
  let rRow = Math.floor(Math.random() * 10);
  let axis = Math.floor(Math.random() * 2) === 1 ? 'horizontal' : 'vertical';
  cpu.cpuPlaceShip(ship, rRow, rCol, axis)
})
}

cpuShipPlacement();

console.log(cpu);



/* Player gameboard */

let player = Gameboard();

let playerShipArray = []

const carrier = Ship('carrier', 5);
const battleship = Ship('battleship', 4);
const destroyer = Ship('destroyer', 3);
const submarine = Ship('submarine', 3);
const patrolBoat = Ship('patrolBoat', 2);

playerShipArray.push(carrier, battleship, destroyer, submarine, patrolBoat);

player.placeShip(carrier, 0, 0, 'horizontal')
player.placeShip(battleship, 1, 0, 'vertical')
player.placeShip(destroyer, 6, 8, 'horizontal')
player.placeShip(submarine, 1, 5, 'vertical')
player.placeShip(patrolBoat, 9, 5, 'horizontal')











/* const cpuGameboard = () => {
  let cpu = Gameboard();

  let shipArray = []
  
  const carrier = Ship('carrier', 5);
  const battleship = Ship('battleship', 4);
  const destroyer = Ship('destroyer', 3);
  const submarine = Ship('submarine', 3);
  const patrolBoat = Ship('patrolBoat', 2);
  
  shipArray.push(carrier, battleship, destroyer, submarine, patrolBoat);
  
  function cpuShipPlacement() {
  shipArray.forEach(ship => {
    let rCol = Math.floor(Math.random() * 10);
    let rRow = Math.floor(Math.random() * 10);
    let axis = Math.floor(Math.random() * 2) === 1 ? 'horizontal' : 'vertical';
    cpu.cpuPlaceShip(ship, rCol, rRow, axis)
  })
  }
  
  
  cpuShipPlacement();
}

cpuGameboard();
 */
module.exports = Gameboard;




