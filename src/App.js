import './App.css';
import { useEffect, useState } from 'react';
import {generateFreshGrid, getFontColor, getBackGroundColor, introduceRandomCell} from './utils'

let keyboardListener = null;


const vals = [0, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]

function App() {
  const [dimensions, setDimensions] = useState({
    rows: 4,
    columns: 4
  })

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
  
  const [grid, setGrid] = useState(generateFreshGrid([dimensions.rows, dimensions.columns]))
  const [prevGrid, setPrevGrid] = useState(grid)
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
      }else if(event.key==='z'){
        setGrid([...prevGrid]);
      }
    });
    return () => {

    }
  }, []);
  return (
    <div className="container">
      <div className="grid-outer">
        {
              grid.map((row, rowIndex)=>(
                  <div key={`row ${rowIndex}`} style={{display:"flex", flexDirection:"row"}}>
                      {
                          row.map((block, blockIndex)=>(
                              <>
                              <div key={block.key} className="block" style={{width: 80, height:80, fontSize:12, color:getFontColor(block.value), backgroundColor:getBackGroundColor(block.value), fontWeight:'700'}}>
                                  {block.value?block.value:null}
                              </div>
                              </>
                          ))
                      }
                  </div>
              ))
          }
      </div>
    </div>
  );
}

export default App;
