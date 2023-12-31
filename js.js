/* Global Variables */

let randomAdjacent;
let adjacentCells;
let adjacentChoice;
let hitCellsWithShip = [];
let hitCellsNoShip = [];
let validChoicesTotal = []
let validity;

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

    // Test if placement will be out of bounds
    if (
      (axis === 'horizontal' && index >= (100 - ship.length + 1)) ||
      (axis === 'horizontal' && col >= (10 - ship.length + 1)) ||
      (axis === 'vertical' && index >= (100 - ship.length * 10 + 10))
    ) {
      throw new Error('Ship placement out of bounds');
    }

    validity = false;

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
      }
    }
      return gameBoard[x];
    }
  }

  function receiveAttack(x) {
    // player receives random attack from cpu
    if (x === undefined) {
      let randomNum = Math.floor(Math.random() * 100);
      while (gameBoard[randomNum].hit === true) {
        randomNum = Math.floor(Math.random() * 100);
      }
      if (gameBoard[randomNum].ship !== null) {
          let shipName = gameBoard[randomNum].ship;
          shipName.hit();  
          console.log(shipName);    
          hitCellsWithShip.push(randomNum);
      } else {
        hitCellsNoShip.push(randomNum);
      }
      gameBoard[randomNum].hit = true;
      changePlayerBoard(randomNum);
      return gameBoard[randomNum];
    } 
    
  /* Bug: hit() called incorrectly */

    // player receives adjacent attack from cpu 
    if (x !== undefined) {
      if (gameBoard[x].hit === true) {
        player.receiveAttack();
      }
      gameBoard[x].hit = true;
      if (gameBoard[x].ship !== null) {
        let shipName = gameBoard[x].ship;
        shipName.hit();
        hitCellsWithShip.push(x);
        console.log(shipName);
      } else {
        hitCellsNoShip.push(x);
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
        if (validity === true) shipNum++;
      } else {
        let axis = 'vertical';
        player.placeShip(ship, index, axis);
        if (validity === true) shipNum++;
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


/* Game loop section */

function gameLoop(cellNum) {
  if (!cpu.checkSunk() && !player.checkSunk()) {
    cpu.attackCPU(cellNum);
    if (!cpu.checkSunk()) {
      player.receiveAttack(adjacentChoice);
      getAdjacentCell();
    }
  }
}

function getAdjacentCell() {
  if (hitCellsWithShip.length === 0) return adjacentChoice = undefined;
  
  // Check if there are cells with ships hit
  if (hitCellsWithShip.length > 0) {
    // Get last ship with cell hit
    const lastHitCell = hitCellsWithShip[hitCellsWithShip.length - 1];

    // Calculate potential adjacent cells
    const left = lastHitCell - 1;
    const right = lastHitCell + 1;
    const up = lastHitCell - 10;
    const down = lastHitCell + 10;

    // Create an array of adjacent cell choices
    const choices = [left, right, up, down];

    // Filter choices to only include valid cells (within grid boundaries and not already hit)
    const validChoices = choices.filter(choice => {
      // Ensure choice is within grid boundaries (0-99)
      const withinBounds = choice >= 0 && choice < 100;

      // Ensure choice doesn't cross rows (prevents 10 to 9 or 0 to 10)
      const sameRow = (Math.floor(choice % 10) === Math.floor(lastHitCell % 10) || Math.floor(choice / 10) === Math.floor(lastHitCell / 10));

      return withinBounds && sameRow && !hitCellsWithShip.includes(choice) && !hitCellsNoShip.includes(choice);
    });

    validChoicesTotal.push(...validChoices);

    if (validChoices.length > 0) {
      // Choose a random valid adjacent cell
      adjacentChoice = validChoices[Math.floor(Math.random() * validChoices.length)];
    } else if (hitCellsWithShip.length > 0) {

      const validChoicesLeft = validChoicesTotal.filter(choice => {
        return (!hitCellsWithShip.includes(choice) && !hitCellsNoShip.includes(choice));
      });
      // Use the last cell from the previous hitCellsWithShip item
      return adjacentChoice = validChoicesLeft[validChoicesLeft.length - 1];
    } else {
      // No more cells with ships hit, reset adjacentChoice
      adjacentChoice = undefined;
    }
  }
}


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

      if (cell.hit === false && cell.ship !== null && cpu.checkSunk() === false && player.checkSunk() === false) {
        gameLoop(cellNum);
        createDiv.classList.add('hit');
        hitInfo();
      } else if (cell.hit === false && cell.ship === null && cpu.checkSunk() === false && player.checkSunk() === false) {
        gameLoop(cellNum);
        createDiv.classList.add('miss');
        misInfo();
      }
      if (cpu.checkSunk() === true) {
        const infoDiv = document.getElementById('info');
        infoDiv.innerText = 'You won! All enemy ships have been sunk.';
        console.log('You won! All enemy ships have been sunk.');
      }
      if (player.checkSunk() === true) {
        const infoDiv = document.getElementById('info');
        infoDiv.innerText = 'You lost! All your ships have been sunk.';
        console.log('You lost! All your ships have been sunk.');
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
      playerShipPlacement(index);
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
    getDiv.classList.add('miss')
  } if (player.checkSunk() === true) {
    const getDiv = document.getElementById(`cell-${i}`);
    getDiv.innerText = 'X';
    getDiv.classList.add('hit');
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

/* Reset */

function resetGame() {
  const homeBtn = document.getElementById('home-btn');
  homeBtn.addEventListener('click', () => {   
    window.location.reload();
  });
}

resetGame();

/* Open Github on icon click */

function openGithub() {
  const githubIcon = document.getElementById('github-icon');
  githubIcon.addEventListener('click', () => {
    window.open('https://github.com/preto-phil');
  });
}

openGithub();