import { useState } from 'react'
import Game from './components/Game'
import './main.scss'
import './queries.scss'

function App() {

  return (
      <div className="app-wrapper">
        <div className="game--window-wrapper">
          <h1>Roll the Dice!</h1>
          <Game />
        </div>
      </div>
  )
}

export default App
