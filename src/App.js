import React from "react"
import Die from "./components/Die"
import "./style.css"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allDiceHeld = dice.every((die) => die.isHeld)
    const firstDieValue = dice[0].value
    const allValueEqual = dice.every((die) => die.value === firstDieValue)
    if(allDiceHeld && allValueEqual) {
        setTenzies(true)
        console.log('You won!')
    }
  }, [dice])


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
        if(!tenzies)
            setDice((prevState) => updateDice(prevState))
        else {
            setTenzies(false)
            setDice(allNewDice())
        } 
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
            {tenzies && <Confetti/>}
            <div className="title-container">
                <h1 className="title">Tenzies</h1>
                <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            </div>
            <div className="dice-container">
                {dieElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
  )
}
