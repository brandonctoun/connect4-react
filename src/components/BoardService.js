export const checkVertical= (board) => {
  // Check only if row is 3 or greater
  for (let row = 3; row < 6; row++) {
    for (let column = 0; column < 7; column++) {
      if (board[row][column]) {
        if (board[row][column] === board[row - 1][column] &&
          board[row][column] === board[row - 2][column] &&
          board[row][column] === board[row - 3][column]) {
          return board[row][column];
        }
      }
    }
  }
}

export const checkHorizontal = (board) => {
  // Check only if column is 3 or less
  for (let row = 0; row < 6; row++) {
    for (let column = 0; column < 4; column++) {
      if (board[row][column]) {
        if (board[row][column] === board[row][column + 1] &&
          board[row][column] === board[row][column + 2] &&
          board[row][column] === board[row][column + 3]) {
          return board[row][column];
        }
      }
    }
  }
}

export const checkDiagonalRight = (board) => {
  // Check only if row is 3 or greater AND column is 3 or less
  for (let row = 3; row < 6; row++) {
    for (let column = 0; column < 4; column++) {
      if (board[row][column]) {
        if (board[row][column] === board[row - 1][column + 1] &&
          board[row][column] === board[row - 2][column + 2] &&
          board[row][column] === board[row - 3][column + 3]) {
          return board[row][column];
        }
      }
    }
  }
}

export const checkDiagonalLeft = (board) => {
  // Check only if row is 3 or greater AND column is 3 or greater
  for (let row = 3; row < 6; row++) {
    for (let column = 3; column < 7; column++) {
      if (board[row][column]) {
        if (board[row][column] === board[row - 1][column - 1] &&
          board[row][column] === board[row - 2][column - 2] &&
          board[row][column] === board[row - 3][column - 3]) {
          return board[row][column];
        }
      }
    }
  }
}

export const checkDraw = (board) => {
  for (let row = 0; row < 6; row++) {
    for (let column = 0; column < 7; column++) {
      if (board[row][column] === null) {
        return null;
      }
    }
  }
  return 'draw';
}

export const checkAll= (board) => {
  return checkVertical(board) || checkDiagonalRight(board) || checkDiagonalLeft(board) || checkHorizontal(board) || checkDraw(board);
}

export default checkAll;