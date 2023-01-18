import React, { useState } from "react";
import Tile from "./Tile";
import { TILE_COUNT, GRID_SIZE, BOARD_SIZE } from "./constants";
import { canSwap, shuffle, swap, isSolved } from "./helpers";

type BoardProps = {
  imgUrl: string
}

function Board({ imgUrl }: BoardProps) {
  const [tiles, setTiles] = useState<any>([...Array(TILE_COUNT).keys()]);

  const [isStarted, setIsStarted] = useState<boolean>(false);

  const [moves, setMoves] = useState<number>(0);

  console.log("is started:", isStarted);

  const shuffleTiles = () => {
    const shuffledTiles = shuffle(tiles);
    setTiles(shuffledTiles);
  };

  const swapTiles = (tileIndex: number) => {
    if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
      const swappedTiles = swap(
        tiles,
        tileIndex,
        tiles.indexOf(tiles.length - 1)
      );
      setTiles(swappedTiles);
      setMoves((prevMove) => prevMove + 1);
    }
  };

  const handleTileClick = (index: number) => {
    if (!isSolved(tiles)) {
      swapTiles(index);
    } else {
      console.log("shuffled puzzle first");
    }
  };

  const handleShuffleClick = () => {
    shuffleTiles();
    setMoves(0);
  };

  const handleStartClick = () => {
    shuffleTiles();
    setIsStarted(true);
  };

  const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE);
  const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE);
  const style = {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  };

  const hasWon = isSolved(tiles);

  return (
    <>
      <p>Moves: {moves} </p>
      <div style={style} className="board">
        {tiles.map((tile: number, index: number) => (
          <Tile
            key={tile}
            index={index}
            imgUrl={imgUrl}
            tile={tile}
            width={pieceWidth}
            height={pieceHeight}
            handleTileClick={handleTileClick}
            isSolved={hasWon}
          />
        ))}
      </div>
      {hasWon && isStarted && <div>Puzzle solved 🧠 🎉</div>}
      {!isStarted ? (
        <button onClick={() => handleStartClick()}>Start game</button>
      ) : (
        <button onClick={() => handleShuffleClick()}>Restart game</button>
      )}
    </>
  );
}

export default Board;
