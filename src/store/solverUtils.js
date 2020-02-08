const VALID_VALUES = [1,2,3,4,5,6,7,8,9];

export function isValidValue (value) {
    // empty string denotes empty cells
    if(value === ''){
        return true
    }
    if (isNaN(value)) {
        return false;
    }
    return VALID_VALUES.indexOf(value) !== -1
}

/**
 * Validates that a cell contains a valid value that is not used in it's peers
 * 
 * @param x index of the cell being checked
 * @param y index of the cell being checked
 * @param sudoku the board being checked
 */

 export function isCellValid(x, y, sudoku) {
     const value = sudoku[x][y]
     // empty cells are always valid
     if (value === '') {
        return true
     }
     // check peer list for this value being used elsewhere
     const peers = getPeers(x, y)
     for(const peer of peers) {
         if (sudoku[peer.x][peer.y] === value) {
             return false
         }
     }
     return true
 }

 /**
  * Rerurns the list of cells that are peers to this cell. 
  * This includes all cells in same row and column as well as the cells in the same grid
  * @param int x
  * @param int y
  */

  export function getPeers(x, y) {
      let peers = []
      // add all y's and x's
      for(let k =0; k < 9; k++) {
          if (k != x) {
              peers.push({
                  x: k,
                  y,
              })
          }
          if (k !== y) {
              peers.push({
                  x,
                  y: k,
              })
          }
      }
  }
    // add the items in the same grid
    const topLeftY = y - y % 3
    const topLeftX = x - x % 3
    for(let i = topLeftX; i < topLeftX + 3; i++) {
        for(let j = topLeftY; j < topLeftY + 3; j++) {
            if (j === y && i === x) {
                continue
            }
            peers.push({
                x: i,
                y: j,
            })
        }
    }
    return peers
}

/**
 * Soles a sudoku puzzle
 * @param sudoku the puzzle to be solved
 */

 

