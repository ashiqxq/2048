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

export const generateRandomNumber = (min, max) => {
  //generates a random number b/w min and max
    let n = Math.floor(Math.random() * (max - min + 1)) + min;
    return n
  }

export const getBackGroundColor = (val) => {
    //gets backgroundcolor for each tile
    if (val in backgroundColorMap){
      return backgroundColorMap[val]
    }
    return '#ffbb33'
  }
  
export const getFontColor = (val) => {
    //gets font color for each tile
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
  
  export const emptyTilesCheck = (grid, gridDimensions) => {
    for (let i=0; i<gridDimensions[0]; i++){
        for (let j=0; j<gridDimensions[1]; j++){
            if (grid[i][j].value===0){
                return true
            }
        }
    }
    return false
  }  
  
  export const checkGameOver = (grid, gridDimensions) => {
      let emptyTilesPresent = emptyTilesCheck(grid, gridDimensions);
      if (emptyTilesPresent){
        return false
      }
      for (let i=0; i<gridDimensions[0]; i++){
        let queue = [...grid[i].map(item=>item.value)]
        let mergedQueue = mergeQueue(queue, ()=>{})
        if (mergedQueue.length!=queue.length){
          return false
        }
      }
      for (let j=0; j<gridDimensions[0]; j++){
        let queue = []
        for (let i=0; i<gridDimensions[0]; i++){
          queue.push(grid[i][j].value)
        }
        let mergedQueue = mergeQueue(queue, ()=>{})
        // if length of possible merged queue and existing is not equal, then merging is possible
        // thus game is not over
        if (mergedQueue.length!=queue.length){
          return false
        }
      }
      return true
  }
export const introduceRandomCell = (grid, gridDimensions, setGameOver) => {
    let maxgridIndex = gridDimensions[0]*gridDimensions[1] - 1
    let randomGridIndex = generateRandomNumber(0, maxgridIndex);
    let [x, y] = getGridPosition(randomGridIndex, gridDimensions);
    let isGameOver = checkGameOver(grid, gridDimensions);
    let emptyTilesPresent = emptyTilesCheck(grid, gridDimensions);
    if (isGameOver){
        setGameOver(isGameOver)
        return [...grid]
    }
    if (emptyTilesPresent){
      //if empty tiles are there we will generate a random index (x, y) that is empty, to fill the new tile
      while (grid[x][y].value!=0){
        randomGridIndex = generateRandomNumber(0, maxgridIndex);
        [x, y] = getGridPosition(randomGridIndex, gridDimensions)
      }
      grid[x][y].value = 2
    }
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
    return zerogrid 
  }
var tapped=false
export const listeners = (moveLeft, moveRight, moveUp, moveDown, resetGame, dimensions, isGameOver) => {
    var touchStartClientX, touchStartClientY;
    var gameContainer = document.getElementsByClassName("grid-outer")[0];
    const onTouchEnd = (event) => {
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

      if (Math.max(absDx, absDy) > 10 && !isGameOver) {
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
    }

    const onTouchMove = (event) => {
      event.preventDefault();
    }
    const onTouchStart = (event) => {
      if(!tapped){ //if tap is not set, set up single tap
        tapped=setTimeout(function(){
            tapped=null
            //insert things you want to do when single tapped
        },300);   //wait 300ms then run single click code
      } else {    //tapped within 300ms of last tap. double tap
        clearTimeout(tapped); //stop single tap callback
        tapped=null
      //insert things you want to do when double tapped
        resetGame(dimensions.rows, dimensions.columns);
      }
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
    }
    const onKeyDown = (event) => {
      if (event.key==='ArrowLeft' && !isGameOver){
        moveLeft();
      }else if(event.key==='ArrowRight' && !isGameOver){
        moveRight();
        
      }else if(event.key==='ArrowUp' && !isGameOver){
        moveUp();
      }else if(event.key==='ArrowDown' && !isGameOver){
        moveDown();
      }else if(event.key==='r'){
        resetGame(dimensions.rows, dimensions.columns);
      }
    }

    //listener for keyboard events
    window.addEventListener("keydown", onKeyDown, false);

    //listener for touch events in mobile devices
    gameContainer.addEventListener('touchstart', onTouchStart,);
  
    gameContainer.addEventListener('touchmove', onTouchMove);
  
    gameContainer.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener("keydown", onKeyDown, false);

      gameContainer.removeEventListener('touchstart', onTouchStart);
    
      gameContainer.removeEventListener('touchmove', onTouchMove);
    
      gameContainer.removeEventListener('touchend', onTouchEnd);
    }
}

export const mergeQueue = (queue, callback) => {
    let mergedQueue = [];
    let n = queue.length;
    for (let k=1; k<n; k++){
      if (queue[k]==queue[k-1]){
        callback((score)=>(score+2*(queue[k]+queue[k-1])))
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