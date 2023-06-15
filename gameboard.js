function createGameBoard(rows, cols) {
  const gameBoard = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      gameBoard.push({ row, col });
    }
  }

  return gameBoard;
}

const Gameboard = () => {
  const gameBoard = createGameBoard(10, 10);

  return gameBoard;
};


// carrier = 5
// destroyer = 4
// frigate = 3
// 
