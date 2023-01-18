import { TILE_COUNT, GRID_SIZE } from "./constants"

// Credits to https://codepen.io/unindented/pen/QNWdRQ
export function isSolvable(tiles: any) {
  let product = 1;
  for (let i = 1, l = TILE_COUNT - 1; i <= l; i++) {
    for (let j = i + 1, m = l + 1; j <= m; j++) {
      product *= (tiles[i - 1] - tiles[j - 1]) / (i - j);
    }
  }
  return Math.round(product) === 1;
}

export function isSolved(tiles: any) {
  for (let i = 0, l = tiles.length; i < l; i++) {
    if (tiles[i] !== i) {
      return false;
    }
  }
  return true;
}

// Get the linear index from a row/col pair.
export function getIndex(row: string, col: string) {
  return parseInt(row, 10) * GRID_SIZE + parseInt(col, 10);
}

// Get the row/col pair from a linear index.
export function getMatrixPosition(index: number) {
  // console.log(`index ${index} and grid ${GRID_SIZE}`,`row is ${(index / GRID_SIZE)} col is ${index % GRID_SIZE}`)
  return {
    row: Math.floor(index / GRID_SIZE),
    col: index % GRID_SIZE,
  };
}

export function getVisualPosition(row: number, col: number, width: number, height: number) {
  return {
    x: col * width,
    y: row * height,
  };
}

export function shuffle(tiles: any): Array<[]> {
  // console.log('original tiles', tiles)
  const shuffledTiles = [
    ...tiles
      .filter((t: number) => t !== tiles.length - 1)
      .sort(() => Math.random() - 0.5),
    tiles.length - 1,
  ];

  // if you want simple shuffle 
  // const shuffledTiles = [...tiles.sort(() => Math.random() - 0.5)]

  // console.log('shuffled tiles', shuffledTiles)
  return isSolvable(shuffledTiles) && !isSolved(shuffledTiles)
    ? shuffledTiles
    : shuffle(shuffledTiles);
}

export function canSwap(srcIndex: number, destIndex: number) {
  // console.log(getMatrixPosition(srcIndex))
  // console.log(getMatrixPosition(destIndex))
  const { row: srcRow, col: srcCol } = getMatrixPosition(srcIndex);
  const { row: destRow, col: destCol } = getMatrixPosition(destIndex);
  // console.log(Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol))
  return Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol) === 1;
}

export function swap(tiles: any, src: number, dest: number) {
  // console.log('current tilies', tiles)
  const tilesResult = [...tiles];
  [tilesResult[src], tilesResult[dest]] = [tilesResult[dest], tilesResult[src]];
  // console.log('swapped tiles', tilesResult)
  return tilesResult;
}

export function updateURLParameter(url: string, param: string, paramVal: string) {
  var newAdditionalURL = "";
  var tempArray = url.split("?");
  var baseURL = tempArray[0];
  var additionalURL = tempArray[1];
  var temp = "";
  if (additionalURL) {
    tempArray = additionalURL.split("&");
    for (var i = 0; i < tempArray.length; i++) {
      if (tempArray[i].split("=")[0] !== param) {
        newAdditionalURL += temp + tempArray[i];
        temp = "&";
      }
    }
  }

  var rows_txt = temp + "" + param + "=" + paramVal;
  return baseURL + "?" + newAdditionalURL + rows_txt;
}
