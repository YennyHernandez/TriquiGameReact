import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const TURNS = {
  X:'x',
  O: 'o'
}
const board = Array(9).fill(null)
const Square = ({children, updateboard, index}) =>{
  return(
    <div className='square'>
      {children}
    </div>
  )
}


function App() {
  return (
   
    <main className='board'>
       <h1>Juega Triqui</h1>
      <section className='game'>
        {
          board.map((_, index) => {
            return(
              <Square key = {index} index = {index}>               
                {index}
              </Square>
            )
          })
        }
      </section>


    </main>
     
  )
}

export default App
