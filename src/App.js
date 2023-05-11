import './App.css';
import { useEffect, useState } from 'react';
import {generateFreshGrid, getFontColor, getBackGroundColor, introduceRandomCell, detectIfMobile, listeners, mergeQueue} from './utils'
import {BsFillArrowUpCircleFill, BsFillArrowDownCircleFill, BsFillInfoCircleFill} from 'react-icons/bs';

let keyboardListener = null;


function App() {

  const moveLeft = () => {
    for (let i=0; i<dimensions.rows; i++){
      let queue = [];
      for (let j=0; j<dimensions.columns; j++){
        if (grid[i][j].value!=0){
          queue.push(grid[i][j].value)
        }
      }
      let mergedQueue = mergeQueue(queue, setScore)


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
  }

  const moveRight = () => {
    for (let i=0; i<dimensions.rows; i++){
      let queue = [];
      for (let j=dimensions.columns-1; j>=0; j--){
        if (grid[i][j].value!=0){
          queue.push(grid[i][j].value)
        }
      }
      let mergedQueue = mergeQueue(queue, setScore)
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
  }

  const moveUp = () => {
    for (let j=0; j<dimensions.columns; j++){
      let queue = [];
      for (let i=0; i<dimensions.rows; i++){
        if (grid[i][j].value!=0){
          queue.push(grid[i][j].value)
        }
      }
      let mergedQueue = mergeQueue(queue, setScore)
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
  }

  const moveDown = () => {
    for (let j=0; j<dimensions.columns; j++){
      let queue = [];
      for (let i=dimensions.rows-1; i>=0; i--){
        if (grid[i][j].value!=0){
          queue.push(grid[i][j].value)
        }
      }
      let mergedQueue = mergeQueue(queue, setScore)
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
  }
  const [dimensions, setDimensions] = useState({
    rows: 4,
    columns: 4
  });
  const [reload, setReload] = useState(false);
  const [isGameOver, setGameOver] = useState(false);
  const [grid, setGrid] = useState(generateFreshGrid([dimensions.rows, dimensions.columns]));
  const [prevGrid, setPrevGrid] = useState(grid);
  const [score, setScore] = useState(0);
  const [containerHeight, setContainerHeight] = useState(detectIfMobile()?300:500);
  const [instruction, setInstruction] = useState(true);
  useEffect(()=>{
    keyboardListener = listeners(moveLeft, moveRight, moveUp, moveDown, resetGame, dimensions, isGameOver)
    return () => {

    }
  }, [dimensions.rows, reload, isGameOver]);

  const resetGame = (rows, columns) => {
    setGrid(generateFreshGrid([rows, columns]));
    setScore(0)
    setReload(!reload)
    setGameOver(false);
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
