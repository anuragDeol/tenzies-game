import React from "react"
import Die from "./components/Die"
import ScoreBoard from "./components/ScoreBoard"
import "./style.css"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import { NotificationManager, NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default function App() {
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rolls, setRolls] = React.useState(0)
    const [timer, setTimer] = React.useState(0)
    const [bestScore, setBestScore] = React.useState(() => {
        return JSON.parse(localStorage.getItem("bestScore")) || Number.MAX_VALUE
    })


    // check if the game is over or not
    React.useEffect(() => {
    const allDiceHeld = dice.every((die) => die.isHeld)
    const firstDieValue = dice[0].value
    const allValueEqual = dice.every((die) => die.value === firstDieValue)
    if(allDiceHeld && allValueEqual) {
        // console.log('You won!')
        setTenzies(true)
    }
    }, [dice])

    React.useEffect(() => {
        let intervalId
        if(timer>0 && tenzies===false) {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1)
            }, 1000)
        }
        if(tenzies && timer<bestScore) {
            setBestScore(timer)
        }
        // return cleanup function that'll be called before the component unmounts or before the effect is run again..
        // ..preventing multiple intervals from running simultaneously
        return () => clearInterval(intervalId)
    }, [timer, tenzies, bestScore])

    React.useEffect(() => {
        // 'bestScore' will only be stored in localStorage, the state 'bestScore' is updated
        localStorage.setItem("bestScore", JSON.stringify(bestScore))
    }, [bestScore])


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
        if(!tenzies){
            if(timer === 0) {
                setTimer(1)
            }
            setDice((prevState) => updateDice(prevState))
            setRolls((prevState) => prevState+1)
        }
        else {
            setTenzies(false)
            setDice(allNewDice())
            setRolls(0)
            setTimer(0)
        }
    }

    function handleClickOnDie(clickedDieId) {
        // console.log(clickedDieId)
        if(timer === 0) {
            setTimer(1)
        }
        setDice((prevState) => {
            const newState = prevState.map((die) => {
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
            {tenzies && bestScore<JSON.parse(localStorage.bestScore) && NotificationManager.success('Woah woah woah!! Someone\'s got a new score to beat', 'New Best Score!', 7000)}
            {tenzies && <Confetti/>}
            <div className="title-container">
                <h1 className="title"><i class="fa-solid fa-dice"></i> Tenzies</h1>
                <p className="instructions"><i class="fa-sharp fa-solid fa-circle-info"></i> Click on any dice you want to keep unchanged and roll the remaining ones again. <br />Keep doing this until you match all ten dice to the same number.</p>
            </div>
            <div className="scoreboard-container">
                <ScoreBoard 
                    rolls={rolls}
                    timer={timer}
                    bestScore={bestScore}
                />
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
            <NotificationContainer />
        </main>
    )
}
