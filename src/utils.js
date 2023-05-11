import {colorMap, backgroundColorMap, initialVals} from './constants';

export const detectIfMobile = () => {
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
    zerogrid[x1][y1] = squareData(randomGridIndex1, initialVals[Math.floor(Math.random() * initialVals.length)]) 
    zerogrid[x2][y2] = squareData(randomGridIndex2, initialVals[Math.floor(Math.random() * initialVals.length)]) 
    // zerogrid[0][0] = squareData(0, 5096); 
    // zerogrid[1][0] = squareData(4, 2); 
    // zerogrid[2][0] = squareData(8, 2); 
    // zerogrid[3][0] = squareData(12, 2); 
    // zerogrid[0][3] = squareData(3, 2); 
    return zerogrid 
  }

export const listeners = (moveLeft, moveRight, moveUp, moveDown, resetGame, dimensions) => {
    window.addEventListener("keydown", (event) => {
        if (event.key==='ArrowLeft'){
          moveLeft();
        }else if(event.key==='ArrowRight'){
          moveRight();
          
        }else if(event.key==='ArrowUp'){
          moveUp();
        }else if(event.key==='ArrowDown'){
          moveDown();
        }else if(event.key==='r'){
          resetGame(dimensions.rows, dimensions.columns);
        }
      });
      var touchStartClientX, touchStartClientY;
      var gameContainer = document.getElementsByClassName("grid-outer")[0];
    
      gameContainer.addEventListener('touchstart', function (event) {
        if ((!window.navigator.msPointerEnabled && event.touches.length > 1) ||
            event.targetTouches.length > 1) {
          return; // Ignore if touching with more than 1 finger
        }
    
        if (window.navigator.msPointerEnabled) {
          touchStartClientX = event.pageX;
          touchStartClientY = event.pageY;
        } else {
          touchStartClientX = event.touches[0].clientX;
          touchStartClientY = event.touches[0].clientY;
        }
    
        event.preventDefault();
      });
    
      gameContainer.addEventListener('touchmove', function (event) {
        event.preventDefault();
      });
    
      gameContainer.addEventListener('touchend', function (event) {
        if ((!window.navigator.msPointerEnabled && event.touches.length > 0) ||
            event.targetTouches.length > 0) {
          return; // Ignore if still touching with one or more fingers
        }
    
        var touchEndClientX, touchEndClientY;
    
        if (window.navigator.msPointerEnabled) {
          touchEndClientX = event.pageX;
          touchEndClientY = event.pageY;
        } else {
          touchEndClientX = event.changedTouches[0].clientX;
          touchEndClientY = event.changedTouches[0].clientY;
        }
    
        var dx = touchEndClientX - touchStartClientX;
        var absDx = Math.abs(dx);
    
        var dy = touchEndClientY - touchStartClientY;
        var absDy = Math.abs(dy);
    
        if (Math.max(absDx, absDy) > 10) {
          // (right : left) : (down : up)
          if (absDx>absDy){
            if (dx>0){
              moveRight()
            }else{
              moveLeft()
            }
          }else{
            if (dy>0){
              moveDown()
            }else{
              moveUp()
            }
          }
        }
      });
}

export const mergeQueue = (queue, setScore) => {
    let mergedQueue = [];
    let n = queue.length;
    for (let k=1; k<n; k++){
      if (queue[k]==queue[k-1]){
        setScore((score)=>(score+2*(queue[k]+queue[k-1])))
        mergedQueue.push(queue[k]+queue[k-1])
        queue[k] = 0
      }else if (n==2) {
        mergedQueue.push(queue[k-1])
        mergedQueue.push(queue[k])
      }else if (k==n-1){
        if (queue[k-1]!=0 && queue[k-1]!=queue[k]){
          mergedQueue.push(queue[k-1])
          mergedQueue.push(queue[k])
        }
        else{
          mergedQueue.push(queue[k])
        }
      }else if (queue[k-1]!=0){
        mergedQueue.push(queue[k-1])
      }
    }
    if (queue.length===1){
      mergedQueue.push(queue[0])
    }
    return mergedQueue
  }