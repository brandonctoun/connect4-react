import React, { useState, useEffect } from 'react';
import Row from './Row';
import { checkAll } from './BoardService';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const Board = () => {

  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const [activeColumn, setActiveColumn] = useState(3);
  const [winner, setWinner] = useState(false);

  useEffect(() => {
    initBoard();
  }, []);

  const handleMouseOver = (column) => {
    if (activeColumn !== column) {
      setActiveColumn(column);
    }
  }

  // Starts new game
  const initBoard = () => {
    // Create a blank 6x7 matrix
    let board = [];
    for (let row = 0; row < 6; row++) {
      let row = [];
      for (let column = 0; column < 7; column++) { row.push(null) }
      board.push(row);
    }

    setBoard(board);
    setCurrentPlayer(1);
    setGameOver(false);
    setMessage('');
    setActiveColumn(3);
    setWinner(false);
  }

  const nextPlayer = () => {
    return (currentPlayer === 1) ? 2 : 1;
  }

  const play = (column) => {
    if (!gameOver) {
      // Place piece on board
      let newBoard = board;
      for (let row = 5; row >= 0; row--) {
        if (!newBoard[row][column]) {
          newBoard[row][column] = currentPlayer;
          break;
        }
        if(row === 0){
          return;
        }
      }

      // Check status of newBoard
      let result = checkAll(newBoard);
      if (!result) {
        setBoard(newBoard);
        setCurrentPlayer(nextPlayer);
      } else {
        if (result === 1) {
          setMessage('Player 1 (red) won!' );
          setWinner(true);
        } else if (result === 2) {
          setMessage('Player 2 (yellow) won!');
          setWinner(true);
        } else if (result === 'draw') {
          setMessage('It was a draw.');
        }
        setBoard(newBoard);
        setGameOver(true);
      }
    }
  }

  const getColumnHeaderClassName = (column) => {
    if (column === activeColumn && !gameOver) {
      if (currentPlayer === 1) {
        return 'redWithBorder'
      }
      else {
        return 'yellowWithBorder'
      }
    }
    else {
      return 'white';
    }
  }

  const getColumnHeaders = () => {
    const placeHolders = [];
    for (let i = 0; i < 7; i++) {
      placeHolders.push(
        <div className="cellPlaceholder" key={`column${i}`}>
          <div className={getColumnHeaderClassName(i)}></div>
        </div>
      );
    }
    return placeHolders;
  }

  const { width, height } = useWindowSize();

    return (
      <div>
        {winner ? <Confetti width={width} height={height} /> : null}
        <p><small>Player {currentPlayer}'s Turn </small></p>
        <div style={{ display: 'flex', width: 504, margin: '0 auto' }}>
          {getColumnHeaders()}
        </div>
        <table>
          <thead>
          </thead>
          <tbody>
            {board.map((row, i) => (<Row key={i} player={currentPlayer} row={row} play={play} mouseOver={handleMouseOver} />))}
          </tbody>
        </table>
        {message ? <p className="message">{message}</p> : <p className="message">&nbsp;</p>}
        {gameOver ? <p className="message">Click the button below to start a new game.</p> : <p className="message">&nbsp;</p>}
        <div className="button" onClick={initBoard}>New Game</div>
      </div>
    );
}

export default Board;