import {colorMap, backgroundColorMap, initialVals} from './constants';

export const detectMob = () => {
    return (( window.innerWidth <= 600 ) && ( window.innerHeight <= 1000 ) );
}

export const squareData = (c, value) => {
    return {
      key: c,
      value
    }
  }

export const generateRandomNumber = (min, max, sparse=false) => {
    let n = Math.floor(Math.random() * (max - min + 1)) + min;
    if (sparse){
      n = Math.floor(Math.random() * (max - min + 1) * Math.random()) + min;
    }
  return n
  }

export const getBackGroundColor = (val) => {
    if (val in backgroundColorMap){
      return backgroundColorMap[val]
    }
    return '#ffbb33'
  }
  
export const getFontColor = (val) => {
    if (val in colorMap){
      return colorMap[val]
    }
    return 'white'
  }
  
export const getGridIndex = (i, j, gridDimensions) => {
    return i*gridDimensions[1]+j
  }
  
export const getGridPosition = (gridIndex, gridDimensions) => {
    return [Math.floor(gridIndex/gridDimensions[1]), gridIndex%gridDimensions[1]]
  }
  
export const generateZeroGrid = (gridDimensions) => {
    let [m, n] = gridDimensions;
    let grid = [];
    let c = 0
    for (let i=0; i<m; i++){
        let row = [];
        for (let j=0; j<n; j++){
            row.push(squareData(c, 0))
            c+=1
        }
        grid.push(row)
    }
    return grid
  }
  
export const checkGameOver = (grid, gridDimensions) => {
    for (let i=0; i<gridDimensions[0]; i++){
        for (let j=0; j<gridDimensions[1]; j++){
            if (grid[i][j].value===0){
                return false
            }
        }
    }
    return true
}
export const introduceRandomCell = (grid, gridDimensions) => {
    let maxgridIndex = gridDimensions[0]*gridDimensions[1] - 1
    let randomGridIndex = generateRandomNumber(0, maxgridIndex);
    let [x, y] = getGridPosition(randomGridIndex, gridDimensions);
    let isGameOver = checkGameOver(grid, gridDimensions);
    if (isGameOver){
        return [...grid]
    }
    while (grid[x][y].value!=0){
        randomGridIndex = generateRandomNumber(0, maxgridIndex);
        [x, y] = getGridPosition(randomGridIndex, gridDimensions)
        console.log("xy", x, y, randomGridIndex)
    }
    grid[x][y].value = 2
    return [...grid]
  }
export const generateFreshGrid = (gridDimensions) => {
    let zerogrid = generateZeroGrid(gridDimensions);
    let maxgridIndex = gridDimensions[0]*gridDimensions[1] - 1
    let randomGridIndex1 = generateRandomNumber(0, maxgridIndex);
    let randomGridIndex2 = generateRandomNumber(0, maxgridIndex);
    while (randomGridIndex2==randomGridIndex1){
      randomGridIndex2 = generateRandomNumber(0, maxgridIndex);
    }
    let [x1, y1] = getGridPosition(randomGridIndex1, gridDimensions);
    let [x2, y2] = getGridPosition(randomGridIndex2, gridDimensions);
    // console.log("x1 y1", x1, y1, "x2, y2", x2, y2, initialVals[Math.floor(Math.random() * initialVals.length)])
    zerogrid[x1][y1] = squareData(randomGridIndex1, initialVals[Math.floor(Math.random() * initialVals.length)]) 
    zerogrid[x2][y2] = squareData(randomGridIndex2, initialVals[Math.floor(Math.random() * initialVals.length)]) 
    // zerogrid[0][0] = squareData(0, 5096); 
    // zerogrid[1][0] = squareData(4, 2); 
    // zerogrid[2][0] = squareData(8, 2); 
    // zerogrid[3][0] = squareData(12, 2); 
    // zerogrid[0][3] = squareData(3, 2); 
    return zerogrid 
  }