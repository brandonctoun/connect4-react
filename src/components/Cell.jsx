import React from 'react';

const Cell = ({ value, columnIndex, play, mouseOver }) => {

  const handleMouseOver = (event) => {
    event.stopPropagation();
    if (mouseOver) {
      mouseOver(columnIndex);
    }
  }

  let color = 'white';
  if (value === 1) {
    color = 'red';
  } else if (value === 2) {
    color = 'yellow';
  }

  return (
    <td>
      <div onMouseOver={handleMouseOver} className="cell" onClick={() => { play(columnIndex) }}>
        <div className={color} ></div>
      </div>
    </td>
  );
};

export default Cell;