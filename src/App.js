import './App.css';
import { useEffect, useState } from 'react';
import {generateFreshGrid, getFontColor, getBackGroundColor, introduceRandomCell, detectMob} from './utils'
import {BsFillArrowUpCircleFill, BsFillArrowDownCircleFill, BsFillInfoCircleFill} from 'react-icons/bs';

let keyboardListener = null;


const vals = [0, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]

function App() {

  const moveLeft = () => {
    let allTilesContinous = true;
    for (let i=0; i<dimensions.rows; i++){
      let queue = [];
      let foundEmptyTile = false;
      let continuous = true;
      for (let j=0; j<dimensions.columns; j++){
        if (grid[i][j].value!=0){
          queue.push(grid[i][j].value)
          if (foundEmptyTile){
            continuous = false;
          }
        }else{
          foundEmptyTile = true;
        }
      }
      let mergedQueue = [];
      let n = queue.length;
      console.log("queue", queue);
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
      console.log("mergedqueue", mergedQueue);

      for (let j=0; j<dimensions.columns; j++){
        if (mergedQueue.length){
          let gridElement = mergedQueue.shift();
          grid[i][j].value = gridElement
        }else{
          grid[i][j].value = 0
        }
      }
      if (continuous){
        console.log(`${i}th row is continuos`)
      }
      allTilesContinous = continuous&allTilesContinous
    }
    // if (!allTilesContinous){
      setGrid(introduceRandomCell(grid, [dimensions.rows, dimensions.columns]));
    // }else{
      // setGrid(grid);
    // }

  }

  const moveRight = () => {
    for (let i=0; i<dimensions.rows; i++){
      let queue = [];
      for (let j=dimensions.columns-1; j>=0; j--){
        if (grid[i][j].value!=0){
          queue.push(grid[i][j].value)
        }
      }
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
      for (let j=dimensions.columns-1; j>=0; j--){
        if (mergedQueue.length){
          let gridElement = mergedQueue.shift();
          grid[i][j].value = gridElement
        }else{
          grid[i][j].value = 0
        }
      }
    }
    setGrid(introduceRandomCell(grid, [dimensions.rows, dimensions.columns]));
  }

  const moveUp = () => {
    for (let j=0; j<dimensions.columns; j++){
      let queue = [];
      for (let i=0; i<dimensions.rows; i++){
        if (grid[i][j].value!=0){
          queue.push(grid[i][j].value)
        }
      }
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
      for (let i=0; i<dimensions.rows; i++){
        if (mergedQueue.length){
          let gridElement = mergedQueue.shift();
          grid[i][j].value = gridElement
        }else{
          grid[i][j].value = 0
        }
      }
    }
    setGrid(introduceRandomCell(grid, [dimensions.rows, dimensions.columns]));
  }

  const moveDown = () => {
    for (let j=0; j<dimensions.columns; j++){
      let queue = [];
      for (let i=dimensions.rows-1; i>=0; i--){
        if (grid[i][j].value!=0){
          queue.push(grid[i][j].value)
        }
      }
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
      for (let i=dimensions.rows-1; i>=0; i--){
        if (mergedQueue.length){
          let gridElement = mergedQueue.shift();
          grid[i][j].value = gridElement
        }else{
          grid[i][j].value = 0
        }
      }
    }
    setGrid(introduceRandomCell(grid, [dimensions.rows, dimensions.columns]));
  }
  const [dimensions, setDimensions] = useState({
    rows: 4,
    columns: 4
  });
  const [grid, setGrid] = useState(generateFreshGrid([dimensions.rows, dimensions.columns]));
  const [prevGrid, setPrevGrid] = useState(grid);
  const [score, setScore] = useState(0);
  const [containerHeight, setContainerHeight] = useState(detectMob()?300:500);
  const [instruction, setInstruction] = useState(false);
  useEffect(()=>{
    keyboardListener = window.addEventListener("keydown", (event) => {
      console.log("event", event)
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
        setScore(0)
      }
    });
    var touchStartClientX, touchStartClientY;
    var gameContainer = document.getElementsByClassName("grid-outer")[0];
  
    gameContainer.addEventListener('touchstart', function (event) {
      console.log("touch start registered")
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
      console.log("touch end registered")
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
  
    return () => {

    }
  }, [dimensions.rows]);

  const resetGame = (rows, columns) => {
    setGrid(generateFreshGrid([rows, columns]));
    setScore(0)
  }

  const onGridSizeChange = (direction) => {
    let newSize = dimensions.rows+direction;
    newSize = Math.min(newSize, 10);
    newSize = Math.max(1, newSize);
    setDimensions({
      rows: newSize,
      columns: newSize
    })
    resetGame(newSize, newSize)
  }
  return (
    <div className="container" style={{position:"relative"}}>
      <div style={{marginBottom:20, display:"flex", justifyContent:"space-between", width:containerHeight, alignItems:"center"}}>
        <div style={{fontSize:40, fontWeight:"500"}}>
          2048
        </div>
        <div style={{cursor:"pointer"}} onClick={()=>{setInstruction(!instruction)}}>
          <BsFillInfoCircleFill style={{color:"#C19A6B"}}/>
        </div>
        <div style={{backgroundColor:"#C19A6B", borderRadius:10, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:5}}>
          <div style={{color:"white", fontSize:12}}>Score</div>
          <div style={{color:"white", fontSize:12, fontWeight:"700"}}>{score}</div>
        </div>
        <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
            {
              dimensions.rows>2?
              <div style={{marginRight:10, cursor:"pointer"}} onClick={()=>{onGridSizeChange(-1)}}> <BsFillArrowDownCircleFill style={{color:"#C19A6B"}}/> </div> 
              :null
            }
            <div style={{fontSize:12, color:"#aeaeae", marginBottom:5}}>Grid size</div> 
            {
              dimensions.rows<10?
              <div style={{marginLeft:10, cursor:"pointer"}} onClick={()=>{onGridSizeChange(1)}}> <BsFillArrowUpCircleFill style={{color:"#C19A6B"}}/> </div>
              :null
            }
        </div>
      </div>
      <div className="grid-outer">
        {
              grid.map((row, rowIndex)=>(
                  <div key={`row ${rowIndex}`} style={{display:"flex", flexDirection:"row"}}>
                      {
                          row.map((block, blockIndex)=>(
                              <>
                              <div key={block.key} className="block" style={{width: containerHeight/dimensions.rows, height:containerHeight/dimensions.rows, fontSize:12, color:getFontColor(block.value), backgroundColor:getBackGroundColor(block.value), fontWeight:'700'}}>
                                  {block.value?block.value:null}
                              </div>
                              </>
                          ))
                      }
                  </div>
              ))
          }
      </div>
      {
        instruction?
        detectMob()?
        <>
          <div style={{marginTop:10}}> Swipe to move the tiles </div>
        </>
        :
        <>
          <div style={{marginTop:10}}> Use ← ↑ → ↓ arrow keys to move the tiles </div>
          <div> Click R to reload </div>
        </>
        :null
      }

      
    </div>
  );
}

export default App;
