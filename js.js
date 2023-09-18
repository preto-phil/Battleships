/* Global Variables */

let randomAdjacent;
let n;
let adjacentCells;
let adjacentChoice;
let cellHit;
let hitCell = [];

/* Ship Factory function */

function Ship(name, length) {

  function hit() {
    this.hits += 1;
    this.sunk = this.isSunk();
  }

  function isSunk() {
    return this.hits === this.length;
  }

  return {
    name,
    length,
    hits: 0,
    sunk: false,
    hit,
    isSunk,
  }
};

/* Gameboard Factory function */

const Gameboard = () => {
  const gameBoard = [];

  function createGameBoard() {
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        gameBoard.push({ row, col, ship: null, hit: false });
      }
    }
  }

  function placeShip(ship, index, axis) {
    const increment = axis === 'horizontal' ? 1 : 10;
    
    let col;
    if (index > 9) {
      col = index.toString()[1];
    } else {
      col = index;
    }
    console.log(col)

    // Test if placement will be out of bounds
    if (
      (axis === 'horizontal' && index >= (100 - ship.length + 1)) ||
      (axis === 'horizontal' && col >= (10 - ship.length + 1)) ||
      (axis === 'vertical' && index >= (100 - ship.length * 10 + 10))
    ) {
      throw new Error('Ship placement out of bounds');
    }

    let validity = false;

    for (let i = 0; i < ship.length; i++) {
      let horNum = index + i;
      let verNum = index + i * 10;
      if (
        (axis === 'horizontal' && gameBoard[horNum].ship !== null) ||
        (axis === 'vertical' && gameBoard[verNum].ship !== null)
      ) {
        validity = false;
        break;
      } else {
        validity = true;
      }
    }

    // Add ship to gameBoard if conditions satisfactory
    if (validity === true) {
      for (let i = 0; i < ship.length; i++) {

        let horNum = index + i;
        let verNum = index + i * 10;
        let cellNum = axis === 'horizontal' ? index + i : index + i * 10;
  
        // Test if placement will overlap with prior placements
        if (
          (axis === 'horizontal' && gameBoard[horNum].ship !== null) ||
          (axis === 'vertical' && gameBoard[verNum].ship !== null)
        ) {
          throw new Error('Ship placement overlapping');
        } else {
          const cell = gameBoard[index + i * increment];
          cell.ship = ship;
          shipUI(cellNum);
        }
      }
    }
  }

  function cpuPlaceShip(ship, row, col, axis) {
    const index = row * 10 + col;
    const increment = axis === 'horizontal' ? 1 : 10;

    for (let i = 0; i < ship.length; i++) {
      const cell = gameBoard[index + i * increment];
      cell.ship = ship;
    }
    console.log(ship);
  }

  // Check if all ships are sunk
  function checkSunk() {
    let totalSunk = 0;
  
    gameBoard.forEach(item => {
      if (item.ship !== null && item.ship.sunk === true) {
        totalSunk++;
      }
    })
    
    if (totalSunk === 17) {
      return true;
    } else {
      return false;
    }
  }

  function attackCPU(x) {
    // cpu receives attack from player 
    if (x !== undefined) {
      if (gameBoard[x].hit === true) {
        console.log('Already hit mate');
      } else {
        gameBoard[x].hit = true;
        if (gameBoard[x].ship !== null) {
          let shipName = gameBoard[x].ship;
          shipName.hit();
          console.log(shipName)
      }
    }
      return gameBoard[x];
    }
  }

  function receiveAttack(x) {
    // player receives random attack from cpu
    cellHit = false;

    if (x === undefined) {
      let randomNum = Math.floor(Math.random() * 100);
      while (gameBoard[randomNum].hit === true) {
        randomNum = Math.floor(Math.random() * 100);
      }
      if (gameBoard[randomNum].ship !== null) {
          let shipName = gameBoard[randomNum].ship;
          shipName.hit();      
          console.log(shipName)
          hitCell.push(randomNum);
          getAdjacentCell(randomNum)
      } else {
        cellHit = false;
      }
      gameBoard[randomNum].hit = true;
      changePlayerBoard(randomNum);
      return gameBoard[randomNum];
    } 
    
    // player receives adjacent attack from cpu 
    if (x !== undefined) {
      if (gameBoard[x].hit === true) {
        player.receiveAttack();
      }
      gameBoard[x].hit = true;
      if (gameBoard[x].ship !== null) {
        let shipName = gameBoard[x].ship;
        shipName.hit();
        console.log(shipName)
        cellHit = true;
      } else {
        cellHit = false;
      }
      changePlayerBoard(x);
      return gameBoard[x];  
    }
  }

  createGameBoard();

  return { 
    gameBoard,
    placeShip,
    cpuPlaceShip,
    receiveAttack,
    checkSunk,
    attackCPU
  }

};


/* Create player and cpu game boards */

/* CPU Gameboard */

let cpu = Gameboard();

let cpuShipArray = []

const cpuCarrier = Ship('cpuCarrier', 5);
const cpuBattleship = Ship('cpuBattleship', 4);
const cpuDestroyer = Ship('cpuDestroyer', 3);
const cpuSubmarine = Ship('cpuSubmarine', 3);
const cpuPatrolBoat = Ship('cpuPatrolBoat', 2);

cpuShipArray.push(cpuCarrier, cpuBattleship, cpuDestroyer, cpuSubmarine, cpuPatrolBoat);

/* Player Gameboard */

let player = Gameboard();

let shipArray = [];

const carrier = Ship('carrier', 5);
const battleship = Ship('battleship', 4);
const destroyer = Ship('destroyer', 3);
const submarine = Ship('submarine', 3);
const patrolBoat = Ship('patrolBoat', 2);

shipArray.push(carrier, battleship, destroyer, submarine, patrolBoat);


/* Function that places player ships by calling placeShip method of Gameboard */

let shipNum = 0;

function playerShipPlacement(index) {
  if (shipNum < 5) {
    let ship = shipArray[shipNum];

    // Only place ship if cell does not contain ship
    if (player.gameBoard[index].ship === null) {
      // Determine axis
      let axis_h = document.querySelector('.axis-h');
      if (axis_h.matches('.active')) {
        let axis = 'horizontal';
        player.placeShip(ship, index, axis);
        shipNum++;
      } else {
        let axis = 'vertical';
        player.placeShip(ship, index, axis);
        shipNum++;
      }
    }
  }

  if (shipNum === 5) {
    displayCPUGrid();
    hideAxis();
    startInfo();
  }
}

/* Function that generates a valid random number and then places cpu ships by calling cpuPlaceShip method of Gameboard  */

function cpuShipPlacement() {

  cpuShipArray.forEach(ship => {
    let rRow = Math.floor(Math.random() * 10);
    let rCol = Math.floor(Math.random() * 10);
    let index = rRow * 10 + rCol;
    let axis = Math.floor(Math.random() * 2) === 1 ? 'horizontal' : 'vertical';
    let i = 0;
    while (i < ship.length) {     
      let num = axis === 'horizontal' ? index + i : index + i * 10;
      while (
        (cpu.gameBoard[num].ship !== null) ||
        (axis === 'horizontal' && rCol >= (10 - ship.length)) ||
        (axis === 'vertical' && rRow >= (10 - ship.length))
      ) {
        rRow = Math.floor(Math.random() * 10);
        rCol = Math.floor(Math.random() * 10);
        index = rRow * 10 + rCol;
        num = axis === 'horizontal' ? index + i : index + i * 10;  
        i = 0;
      }

      if (cpu.gameBoard[num].ship === null) {
        i++;
      }
    }

    cpu.cpuPlaceShip(ship, rRow, rCol, axis)
  });
  return;
}

cpuShipPlacement()

console.log(cpu)
console.log(player)


/* Game loop section */

function gameLoop(cellNum) {
  if (
    (cpu.checkSunk() === false) ||
    (player.checkSunk() === false)
  ) {
    cpu.attackCPU(cellNum);

    if (cellHit === true) {
      getAdjacentCell(adjacentChoice)
      player.receiveAttack(adjacentChoice);
    } else {
      player.receiveAttack();
    }
  }
}

/* CPU choose adjacent cell */

function getAdjacentCell(c) {
  hitCell.push(c);

    do {
      randomAdjacent = Math.floor(Math.random() * 4);
      n = hitCell[hitCell.length - 1];
      adjacentCells = [Number(n) - 1, Number(n) + 1, Number(n) - 10, Number(n) + 10];
      adjacentChoice = adjacentCells[randomAdjacent];
      // if adjacent choice cell already hit - randomAdjacent
      // if no option is valid
      console.log(hitCell);
      console.log(adjacentChoice);
      cellHit = true;
    }
    while ( adjacentChoice < 0 || adjacentChoice > 99 ) 

  // if adjacent cell less than 0 or bigger than 99 then invalid
  // if adjacent cell is already hit then invalid
  // if adjacent cell goes from 9 to 10 invalid
}

/* 

PROBLEM: After adjacent cell with ship hit then attacks on player gameboard stops - perhaps that same cell is hit multiple times?

FIX NEEDED: After successfully hitting adjacent cell, then hit following adjacent cell

Partially resolved 

New problem is that some hits are not administered - thus question is whether what happens with hit (possibly adjacent cell hit numerous times)

*/


/* UI Section */

/* Function that creates game board in the UI */
function createCPUGameboard() {
  const cpuDiv = document.getElementById('cpu-gb');

  cpu.gameBoard.forEach(cell => {
    const createDiv = document.createElement('div');
    createDiv.classList.add('cell', 'inactive');
    createDiv.innerText = '';
    cpuDiv.appendChild(createDiv);

    // Event listener that enables calling gameLoop when cell clicked
    // Also creates div's and classes for UI purposes
    createDiv.addEventListener('click', () => {
      let cellNum = (Number(cell.row) * 10 + Number(cell.col));

      if (cell.hit === false && cell.ship !== null && cpu.checkSunk() === false) {
        gameLoop(cellNum);
        console.log(cellNum);
        createDiv.classList.add('hit');
        hitInfo();
      } else if (cell.hit === false && cell.ship === null && cpu.checkSunk() === false) {
        gameLoop(cellNum);
        console.log(cellNum);
        createDiv.classList.add('miss');
        misInfo();
      }
      if (cpu.checkSunk() === true) {
        const infoDiv = document.getElementById('info');
        infoDiv.innerText = 'You won! All enemy ships have been sunk.';
        console.log('You won! All enemy ships have been sunk.');
      }
    })
  })
}

// creates the game board in ui
function createPlayerGameboard() {
  const playerDiv = document.getElementById('player-gb');

  for (let i = 0; i < 100; i++) {
    const createDiv = document.createElement('div');
    createDiv.classList.add('p-cell');
    createDiv.setAttribute('id', `cell-${i}`)
    createDiv.innerText = '';

    createDiv.addEventListener('click', () => {
      const index = [...playerDiv.children].indexOf(createDiv);
      console.log(index);
      playerShipPlacement(index)
    })

    playerDiv.appendChild(createDiv);
  }
}
 
// display attack received on player board
function changePlayerBoard(i) {
  if (player.gameBoard[i].ship !== null && player.checkSunk() === false) {
    const getDiv = document.getElementById(`cell-${i}`);
    getDiv.innerText = 'X';
    getDiv.classList.add('hit');
  } else if (player.gameBoard[i].ship === null && player.checkSunk() === false) {
    const getDiv = document.getElementById(`cell-${i}`);
    console.log(getDiv)
    getDiv.classList.add('miss')
  }
  if (player.checkSunk() === true) {
    const infoDiv = document.getElementById('info');
    infoDiv.innerText = 'You lost! All your ships have been sunk.';
    console.log('You lost! All your ships have been sunk.');
  }
}

function shipUI(cellNum) {
  const getDiv = document.getElementById(`cell-${cellNum}`);
  getDiv.classList.add('ship');
}

function displayCPUGrid() {
  const cpuGrid = document.getElementById('main-right');
  cpuGrid.style.display = 'flex';
}

createCPUGameboard();
createPlayerGameboard();



/* Display info in info div */
function displayInfo() {
  const infoDiv = document.getElementById('info');
  infoDiv.innerText = "Place Your Ships"
}

displayInfo();

function startInfo() {
  const infoDiv = document.getElementById('info');
  infoDiv.innerText = "Time to start! Click on a cell in the enemy grid to attack!"
}

function hitInfo() {
  const infoDiv = document.getElementById('info');
  infoDiv.innerText = "Nice! You hit an enemy ship! Carry on..."
}

function misInfo() {
  const infoDiv = document.getElementById('info');
  infoDiv.innerText = "You missed! Try again..."
}


/* Toggle axis options */

function toggleAxis() {
  const axis_h = document.getElementsByClassName('axis-h')[0];
  const axis_v = document.getElementsByClassName('axis-v')[0];

  if (axis_h.classList.contains('active')) {
    axis_h.classList.remove('active');
    axis_v.classList.add('active');
  } else {
    axis_v.classList.remove('active');
    axis_h.classList.add('active');}
}

const axisOptions = document.querySelector('.axis-options');
axisOptions.addEventListener('click', () => {
  toggleAxis();
});

/* Function that hides info - called when all player ships are placed */

function hideAxis() {
  const axisInfoBlock = document.querySelector('#main-right-axis');
  axisInfoBlock.style.display = 'none';
}

/* Dark theme / light theme */

function toggleTheme() {
  const themeDiv = document.querySelector('#theme');
  const themeBtn = document.querySelector('#theme-btn');
  themeDiv.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');

    if (document.body.classList.contains('light-mode')) {
      themeBtn.innerText = 'Dark Mode';
    } else {
      themeBtn.innerText = 'Light Mode';
    }
  }); 
}

toggleTheme();

/* Open Github on icon click */

function openGithub() {
  const githubIcon = document.getElementById('github-icon');
  githubIcon.addEventListener('click', () => {
    window.open('https://github.com/preto-phil');
  });
}

openGithub();