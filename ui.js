let randomAdjacent;
let n;
let adjacentCells;
let adjacentChoice;
let cellHit;
let hitCell = [];

function getAdjacentCell(c) {


  hitCell.push(c);
  if (cellHit === true) {
    randomAdjacent;
  } else {
    randomAdjacent = Math.floor(Math.random() * 4);
  }
  console.log('randomAdjacent = ' + randomAdjacent);
  n = hitCell[0];
  console.log('n = ' + n);
  adjacentCells = [Number(n) - 1, Number(n) + 1, Number(n) - 10, Number(n) + 10];
  adjacentChoice = adjacentCells[randomAdjacent];
  console.log(hitCell);
  console.log(adjacentChoice);
  cellHit = true;

  // if adjacent cell less than 0 or bigger than 99 then invalid
  // if adjacent cell is already hit then invalid
  // if adjacent cell goes from 9 to 10 invalid




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
        if (cellHit === true) {
          randomAdjacent;
        } else {
          randomAdjacent = Math.floor(Math.random() * 4);
        }
        console.log('randomAdjacent = ' + randomAdjacent);
        n = hitCell[0];
        console.log('n = ' + n);
        adjacentCells = [Number(n) - 1, Number(n) + 1, Number(n) - 10, Number(n) + 10];
        adjacentChoice = adjacentCells[randomAdjacent];
        console.log(hitCell);
        console.log(adjacentChoice);
        cellHit = true;
    } else {
      cellHit = false;
    }
    
    gameBoard[randomNum].hit = true;
    changePlayerBoard(randomNum);
    return gameBoard[randomNum];
  } 
  
  // cpu receives attack from player 
  if (x !== undefined) {
    gameBoard[x].hit = true;
    if (gameBoard[x].ship !== null) {
      let shipName = gameBoard[x].ship;
      shipName.hit();
      console.log(shipName)
      cellHit = true;
    }
    changePlayerBoard(x);
    return gameBoard[x];  
  }
}