import { useState } from 'react';
import Player from './components/player.jsx';
import Gameboard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import { WINNING_COMBINATIOMNS } from './WINNING_COMBINATIONS.js';
import GameOver from './components/GamerOver.jsx';
 
const PLAYERS={
  X:'player 1',
  O:'player 2',
}
 const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];
function deriveActivePlayer(gameTurns){
  let currentPlayer ='X'
  if(gameTurns.length>0 && gameTurns[0].player ==='X'){
    currentPlayer ='O';
  }
  return currentPlayer;
}
    
function deriveGameBoard(gameTurns){
  let gameBoard=[...INITIAL_GAME_BOARD.map(array =>[...array])];
  for(const turn of gameTurns){
      const{square,player}=turn;
      const {row,col}=square;
      gameBoard[row][col]=player;
  }
  return gameBoard;
}
 
 function deriveWinner(gameBoard,players){
  let Winner;
  for (const combination of WINNING_COMBINATIOMNS){
    const firstSquareSymbol= gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol= gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol= gameBoard[combination[2].row][combination[2].column];
     if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
             Winner=players[firstSquareSymbol];
     }
  }
  return Winner;
 }
function App() {

  const[players,setPlayers]=useState( PLAYERS );
  const [gameTurns,setGameTurns]=useState([]);
   const  activePlayer=deriveActivePlayer(gameTurns);
  const gameBoard=deriveGameBoard(gameTurns)
  const Winner =deriveWinner(gameBoard,players)
  const hasDraw =gameTurns.length ===9 && !Winner;

  function handleSelectSquare(rowIndex,colIndex){
   setGameTurns(prevTurns =>{
       const currentPlayer =deriveActivePlayer(prevTurns);
      
      const updatedTurns=[
        {square: {row: rowIndex,col: colIndex},player: currentPlayer},
        ...prevTurns];
        return updatedTurns;
    });
  }
     function handleRestart(){
      setGameTurns([])
     }
     
     function handlePlayerNameChange(symbol,newName){
     setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]:newName
      }
     });
     }




  return(
   <main>
<div id="game-container">
 <ol id="players" className='highlight-player'>
 <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer ==='X'} onChangeName={handlePlayerNameChange}/>
 <Player initialName={PLAYERS.O}symbol="O"isActive={activePlayer ==='O'} onChangeName={handlePlayerNameChange} />
 </ol>
 {(Winner || hasDraw ) && <GameOver Winner={Winner} onReStart={handleRestart}/> }
   <Gameboard onSelectSquare={handleSelectSquare} 
   board={gameBoard}
    turns={gameTurns}/>
</div>
<Log turns={gameTurns}/>
  </main>
  );
}

export default App
