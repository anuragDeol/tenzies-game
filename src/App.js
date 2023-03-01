import React from "react"
import Die from "./components/Die"
import "./style.css"

export default function App() {

  const [dice, setDice] = React.useState(allNewDice())
    
  function allNewDice() {
      const newDice = []
      for (let i = 0; i < 10; i++) {
          newDice.push(Math.ceil(Math.random() * 6))
      }
      return newDice
  }
  

  const dieElements = dice.map((dieValue, index) => {
      return (
          <Die value={dieValue}/>
      )
  })
  return (
    <main className="main-container">
      <main>
        <div className="dice-container">{dieElements}</div>
      </main>
    </main>
  )
}
