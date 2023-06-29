// Attack enemy gameboard

// AI player
// Randomise placeShip coordinates

// create two boards 
// one for player - make manual decisions
// one for cpu - make automatic decisions

function Player(playerName) {

  let GB = Gameboard();

  let shipArray = [];
  
  const carrier = Ship('carrier', 5);
  const battleship = Ship('battleship', 4);
  const destroyer = Ship('destroyer', 3);
  const submarine = Ship('submarine', 3);
  const patrolBoat = Ship('patrolBoat', 2);
  
  shipArray.push(carrier, battleship, destroyer, submarine, patrolBoat);

  function playerShipPlacement() {
    shipArray.forEach(ship => {
      // choose coordinates
      // choose horizontal or vertical
      // call GB.placeShip(ship, rowCoordinates, colCoordinates, axis)
    })
  }

  function cpuShipPlacement() {

    shipArray.forEach(ship => {
      let rRow = Math.floor(Math.random() * 10);
      let rCol = Math.floor(Math.random() * 10);
      let index = rRow * 10 + rCol;
      let axis = Math.floor(Math.random() * 2) === 1 ? 'horizontal' : 'vertical';
  
      while (
        (axis === 'horizontal' && index >= (100 - ship.length + 1)) ||
        (axis === 'vertical' && index >= (100 - (ship.length * 10) + 10))
      ) {
        rRow = Math.floor(Math.random() * 10);
        rCol = Math.floor(Math.random() * 10);
        index = rRow * 10 + rCol;
      }
  
      let i = 0;
      while (i < ship.length) {     
        let num = axis === 'horizontal' ? index + i : index + i * 10;
        while (cpu.gameBoard[num].ship !== null) {
          rRow = Math.floor(Math.random() * 10);
          rCol = Math.floor(Math.random() * 10);
          index = rRow * 10 + rCol;
          num = axis === 'horizontal' ? index + i : index + i * 10;
          while (
            (axis === 'horizontal' && index >= (100 - ship.length + 1)) ||
            (axis === 'vertical' && index >= (100 - (ship.length * 10) + 10))
          ) {
            rRow = Math.floor(Math.random() * 10);
            rCol = Math.floor(Math.random() * 10);
            index = rRow * 10 + rCol;
            num = axis === 'horizontal' ? index + i : index + i * 10;
          }    
          i = 0;
        }
  
        if (GB.gameBoard[num].ship === null) {
          i++;
        }
      }
  
      GB.cpuPlaceShip(ship, rRow, rCol, axis)
    });
    return;
  }



}


cpu.receiveAttack(6)
cpu.receiveAttack(7)    
cpu.receiveAttack(8)
cpu.receiveAttack(14)
cpu.receiveAttack(24)
cpu.receiveAttack(34)
cpu.receiveAttack(44)
cpu.receiveAttack(54)
cpu.receiveAttack(27)
cpu.receiveAttack(28)
cpu.receiveAttack(69)
cpu.receiveAttack(68)
cpu.receiveAttack(67)
cpu.receiveAttack(50)
cpu.receiveAttack(60)
cpu.receiveAttack(70)