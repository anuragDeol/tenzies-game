import React from "react"
import Die from "./components/Die"
import "./style.css"
import {nanoid} from "nanoid"

export default function App() {

  const [dice, setDice] = React.useState(allNewDice())

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
  function allNewDice() {
      const newDice = []
      for (let i = 0; i < 10; i++) {
          const value = Math.ceil(Math.random() * 6)
          newDice.push(generateNewDie())
      }
      return newDice
  }

  function updateDice(prevState) {
    // console.log(prevState)
    const newState = prevState.map((die) => {
        return die.isHeld ? die : generateNewDie()
    })
    return newState
  }
  
  function rollDice() {
      setDice((prevState) => updateDice(prevState))
  }

  function handleClickOnDie(clickedDieId) {
      // console.log(clickedDieId)
      setDice((prevState) => {
          const newState = prevState.map(die => {
              return die.id === clickedDieId ? {...die, isHeld: !die.isHeld} : die
          })
          return newState
      })
  }

  const dieElements = dice.map((die, index) => {
      return (
          <Die 
              key={die.id} 
              die={die} 
              handleClick={() => handleClickOnDie(die.id)}
          />
      )
  })

  
  return (
    <main className="main-container">
        <div className="title-container">
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        </div>
        <div className="dice-container">
          {dieElements}
        </div>
        <button className="roll-dice" onClick={rollDice}>Roll</button>
    </main>
  )
}
