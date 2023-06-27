import { useState } from 'react'
import './App.css'  
const TURNS = {
  X:'x',
  O: 'o'
}
const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const Square = ({children, isSelected, updateboard, index}) =>{ //componente
  const className = `square ${isSelected ? 'is-selected' : ''}`
  const handleClick = () =>{
    updateboard(index)
  }
  
  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}
function App() {
  const [board, setBoard] = useState(Array(9).fill(null)) //estado tablero
  const [turn, setTurn] = useState(TURNS.X) //estado del turno
  const [winner, setwinner] = useState(null) //esatdo ganador, null-no hay nada, false-empate, algo-ganador
  const checkWinner = (boardToCheck) => {
    //revisa si se cumplen las combinaciones
    for (const combo of WINNER_COMBOS){
      const [a,b,c] = combo
      if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]){
        return boardToCheck[a]
      }
    }
    //si no hay naganador
    return null
  }

  const checkEndGame = (newBoard) =>{
    return newBoard.every((Square) => Square != null)
  }

  const updateboard = (index) =>{
    if(board[index] || winner) return //si hay algo ya en el board no haga nada, winner no esta vacio
    //actualiza tablero
    const newBoard = [...board] //copia del board con todo los elementos, import porque los estados deben ser inmutables
    newBoard[index] = turn
    setBoard(newBoard)
    //cmabia turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //revisa si hay  ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner){
      setwinner(newWinner)  //actualización asincrona, no bloquea la ejecución del codigo.
    }
    // Revisa si se rellenaron todas posiciones
    else if(checkEndGame(newBoard)){
      setwinner(false)

    }
  }

  const resetGame= () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setwinner(null)
  }


  return (  
    <main className='board'>
       <h1>Juega Triqui</h1>
       <button onClick={resetGame}> Reset </button>
      <section className='game'>
        {
          board.map((_, index) => {
            return(
              <Square key = {index} index = {index} updateboard ={updateboard}>               
                {board[index]} 
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square> 
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square> 

      </section>

      {
        winner != null &&(
          <section className='winner'>
            <div className=' text'>
              <h2>
                {
                  winner === false ? 'empate': 'ganador'
                }               
              </h2>
              <header className='win'>
               {winner && <Square> {winner}</Square>} 
              </header>
              <footer>
                <button onClick={resetGame}> Empezar de nuevo</button>
              </footer> 
            </div>

          </section>

        )
      }


    </main>
  )
}
export default App