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
    
    // Test if placement will be out of bounds
    if (
      (axis === 'horizontal' && index >= (100 - ship.length + 1)) ||
      (axis === 'vertical' && index >= (100 - ship.length * 10 + 10))
    ) {
      throw new Error('Ship placement out of bounds');
    }

    // Add ship to gameBoard if conditions satisfactory
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

  function cpuPlaceShip(ship, row, col, axis) {
    const index = row * 10 + col;
    const increment = axis === 'horizontal' ? 1 : 10;

    for (let i = 0; i < ship.length; i++) {
      const cell = gameBoard[index + i * increment];
      cell.ship = ship;
    }
    console.log(ship);
  }

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
          console.log(shipName)
      }
      gameBoard[randomNum].hit = true;
      changePlayerBoard(randomNum);
      return gameBoard[randomNum];
    } else {

      // cpu receives attack from player 
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

  createGameBoard();

  return { 
    gameBoard,
    placeShip,
    cpuPlaceShip,
    receiveAttack,
    checkSunk
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

  if (shipNum === 5) {
    displayCPUGrid();
    hideAxis();
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
    cpu.receiveAttack(cellNum);
    player.receiveAttack();
    if (cpu.checkSunk() === true) {
      console.log('You won! All enemy ships have been sunk.');
    } else if (player.checkSunk() === true) {
      console.log('You lost! All your ships have been sunk.');
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

      if (cell.ship !== null && cpu.checkSunk() === false) {
        gameLoop(cellNum);
        console.log(cellNum);
        createDiv.classList.add('hit');
      } else if (cell.ship === null && cpu.checkSunk() === false) {
        gameLoop(cellNum);
        console.log(cellNum);
        createDiv.classList.add('miss')
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

/* Open Github on icon click */

function openGithub() {
  const githubIcon = document.getElementById('github-icon');
  githubIcon.addEventListener('click', () => {
    window.open('https://github.com/preto-phil');
  });
}

openGithub();