import React from 'react';
import Cell from './Cell';

const Row = ({ row, play, player, mouseOver }) => {
  return (
    <tr>
      {row.map((cell, i) => <Cell mouseOver={mouseOver} key={`cell${row}${i}`} player={player} value={cell} columnIndex={i} play={play} />)}
    </tr>
  );
};

export default Row;