import React from "react";
import { Motion, spring } from "react-motion";
import { getMatrixPosition, getVisualPosition } from "./helpers";
import { TILE_COUNT, GRID_SIZE, BOARD_SIZE } from "./constants";

function Tile(props) {
  const { tile, index, width, height, handleTileClick, imgUrl, isSolved } =
    props;

  const { row, col } = getMatrixPosition(index);

  const visualPos = getVisualPosition(row, col, width, height);

  // console.log(`position ${row} and ${col}`,visualPos)

  const tileStyle = {
    width: `calc(100% / ${GRID_SIZE})`,
    height: `calc(100% / ${GRID_SIZE})`,
    translateX: visualPos.x,
    translateY: visualPos.y,
    backgroundImage: `url(${imgUrl})`,
    backgroundSize: `${BOARD_SIZE}px`,
    backgroundPosition: `${(100 / (GRID_SIZE - 1)) * (tile % GRID_SIZE)}% ${
      (100 / (GRID_SIZE - 1)) * Math.floor(tile / GRID_SIZE)
    }%`,
  };

  const motionStyle = {
    translateX: spring(visualPos.x),
    translateY: spring(visualPos.y),
  };

  return (
    <Motion style={motionStyle}>
      {({ translateX, translateY }) => (
        <li
          style={{
            ...tileStyle,
            transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
            // Is last tile?
            // opacity: tile === TILE_COUNT - 1 ? 0 : 1,
            opacity: tile === TILE_COUNT - 1 ? (isSolved ? 1 : 0) : 1,
          }}
          className="tile"
          onClick={() => handleTileClick(index)}
        >
          {/* {!imgUrl && `${tile + 1}`} */}
          {tile + 1}
        </li>
      )}
    </Motion>
    // <li
    //   style={{
    //     ...tileStyle,
    //     transform: `translate3d(${visualPos.x}px, ${visualPos.y}px, 0)`,
    //     // Is last tile?
    //     // opacity: tile === TILE_COUNT - 1 ? 0 : 1,
    //     opacity: tile === TILE_COUNT - 1 ? (isSolved ? 1 : 0) : 1,
    //   }}
    //   className="tile"
    //   onClick={() => handleTileClick(index)}
    // >
    //   {/* {!imgUrl && `${tile + 1}`} */}
    //   {tile + 1}
    // </li>
  );
}

export default Tile;
