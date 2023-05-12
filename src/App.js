import './App.css';
import { useCallback, useEffect, useState } from 'react';
import {generateFreshGrid, getFontColor, getBackGroundColor, introduceRandomCell, detectIfMobile, listeners, mergeQueue} from './utils'
import {BsFillArrowUpCircleFill, BsFillArrowDownCircleFill, BsFillInfoCircleFill} from 'react-icons/bs';

let keyboardListener = null;
let grid = [[]];
let dimensions = {
  rows: 4,
  columns: 4
}

function App() {

  const moveLeft = useCallback(() => {
    //(1) for a left arrow press or left swipe, we will loop rows from left to right,
    //(2)  and slide all the non empty elements to the queue
    for (let i=0; i<dimensions.rows; i++){
      let queue = [];
      for (let j=0; j<dimensions.columns; j++){
        if (grid[i][j].value!=0){
          queue.push(grid[i][j].value)
        }
      }
      //(3) from the slided queue, we will merge the consecutive pairs of identical elements, 
      //(4) the mergequeue function takes care of the same
      let mergedQueue = mergeQueue(queue, (func)=>{
        setScore(func)
      })

      //(5) once the merged queue is found we will fill the grid rows from left to right
      for (let j=0; j<dimensions.columns; j++){
        if (mergedQueue.length){
          let gridElement = mergedQueue.shift();
          grid[i][j].value = gridElement
        }else{
          grid[i][j].value = 0
        }
      }
    }
      setGrid(introduceRandomCell(grid, [dimensions.rows, dimensions.columns], setGameOver));
  }, [])

  const moveRight = useCallback(() => {
    //(6) for a right arrow press or right swipe, we will loop rows from right to left,
    //(7)  and slide all the non empty elements to the queue
    for (let i=0; i<dimensions.rows; i++){
      let queue = [];
      for (let j=dimensions.columns-1; j>=0; j--){
        if (grid[i][j].value!=0){
          queue.push(grid[i][j].value)
        }
      }
      //same as (3) and (4)
      let mergedQueue = mergeQueue(queue, (func)=>{
        setScore(func)
      })
      //(8) once the merged queue is found we will fill the grid rows from right to left
      for (let j=dimensions.columns-1; j>=0; j--){
        if (mergedQueue.length){
          let gridElement = mergedQueue.shift();
          grid[i][j].value = gridElement
        }else{
          grid[i][j].value = 0
        }
      }
    }
    setGrid(introduceRandomCell(grid, [dimensions.rows, dimensions.columns], setGameOver));
  }, [])

  const moveUp = useCallback(() => {
    //(9) for a up arrow press or up swipe, we will loop columns from top to bottom,
    //(10)  and slide all the non empty elements to the queue
    for (let j=0; j<dimensions.columns; j++){
      let queue = [];
      for (let i=0; i<dimensions.rows; i++){
        if (grid[i][j].value!=0){
          queue.push(grid[i][j].value)
        }
      }
      //same as (3) and (4)
      let mergedQueue = mergeQueue(queue, (func)=>{
        setScore(func)
      })
      //(11) once the merged queue is found we will fill the grid rows from top to bottom
      for (let i=0; i<dimensions.rows; i++){
        if (mergedQueue.length){
          let gridElement = mergedQueue.shift();
          grid[i][j].value = gridElement
        }else{
          grid[i][j].value = 0
        }
      }
    }
    setGrid(introduceRandomCell(grid, [dimensions.rows, dimensions.columns], setGameOver));
  }, [])

  const moveDown = useCallback(() => {
    //(12) for a up arrow press or up swipe, we will loop columns from bottom to top,
    //(13)  and slide all the non empty elements to the queue
    for (let j=0; j<dimensions.columns; j++){
      let queue = [];
      for (let i=dimensions.rows-1; i>=0; i--){
        if (grid[i][j].value!=0){
          queue.push(grid[i][j].value)
        }
      }
      //same as (3) and (4)
      let mergedQueue = mergeQueue(queue, (func)=>{
        setScore(func)
      })
      //(14) once the merged queue is found we will fill the grid rows from bottom to top
      for (let i=dimensions.rows-1; i>=0; i--){
        if (mergedQueue.length){
          let gridElement = mergedQueue.shift();
          grid[i][j].value = gridElement
        }else{
          grid[i][j].value = 0
        }
      }
    }
    setGrid(introduceRandomCell(grid, [dimensions.rows, dimensions.columns], setGameOver));
  }, [])
  const [reload, setReload] = useState(false);
  const [isGameOver, setGameOver] = useState(false);
  // const [grid, setGrid] = useState(generateFreshGrid([dimensions.rows, dimensions.columns]));
  const [score, setScore] = useState(0);
  const [containerHeight, setContainerHeight] = useState(detectIfMobile()?300:500);
  const [instruction, setInstruction] = useState(true);
  const setGrid = (newGrid) => {
    grid = newGrid
    setReload((reload)=>(!reload))
  }
  useEffect(()=>{
    setGrid(generateFreshGrid([dimensions.rows, dimensions.columns]))
    keyboardListener = listeners(moveLeft, moveRight, moveUp, moveDown, resetGame, dimensions, isGameOver)
    return () => {

    }
  }, [dimensions.rows]);

  const resetGame = (rows, columns) => {
    setGrid(generateFreshGrid([rows, columns]));
    setScore(0)
    setReload(!reload)
    setGameOver(false);
  }

  const setDimensions = (newSize) => {
    dimensions = {
      rows: newSize,
      columns: newSize
    }
  }

  const onGridSizeChange = (direction) => {
    let newSize = dimensions.rows+direction;
    newSize = Math.min(newSize, 10);
    newSize = Math.max(1, newSize);
    setDimensions(newSize)
    resetGame(newSize, newSize)
  }
  return (
    <div className="container" style={{position:"relative"}}>
      <div style={{marginBottom:20, display:"flex", justifyContent:"space-between", width:containerHeight, alignItems:"center"}}>
        <div style={{fontSize:40, fontWeight:"500"}}>
          2048
        </div>
        <div style={{cursor:"pointer"}} onClick={()=>{setInstruction(!instruction)}}>
          <BsFillInfoCircleFill style={{color:"#C19A6B", fontSize:20}}/>
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
      <div className="grid-outer" style={{position:"relative"}}>
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
          {
            isGameOver?
            <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", width:"100%", height:"100%", position:"absolute", backgroundColor:"white", top:0, opacity:0.8, color:"#C19A6B", fontSize:60, fontWeight:"700"}}>
              GAME OVER {'\n'} <br/> <span style={{fontSize:20}}>press 'r' to play again</span>
            </div>
            :null
          }
      </div>
      {
        instruction?
        detectIfMobile()?
        <>
          <div style={{marginTop:10}}> Swipe to move the tiles </div>
        </>
        :
        <>
          <div style={{marginTop:10}}> Use ← ↑ → ↓ arrow keys to move the tiles </div>
          <div> Click R to restart the game </div>
        </>
        :null
      }

      
    </div>
  );
}

export default App;
