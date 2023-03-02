import React from "react"
import Die from "./components/Die"
import "./style.css"
import {nanoid} from "nanoid"

export default function App() {

  const [dice, setDice] = React.useState(allNewDice())
    
  function allNewDice() {
      const newDice = []
      for (let i = 0; i < 10; i++) {
          const value = Math.ceil(Math.random() * 6)
          newDice.push({value: value, isHeld: false, id: nanoid()})
      }
      return newDice
  }
  
  function rollDice() {
      setDice(allNewDice())
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
        <div className="dice-container">
          {dieElements}
        </div>
        <button className="roll-dice" onClick={rollDice}>Roll</button>
    </main>
  )
}
