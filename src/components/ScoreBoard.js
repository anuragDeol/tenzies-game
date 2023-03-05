import React from 'react'

export default function ScoreBoard(props) {
    return (
        <div className="score-board">
            <h4>Rolls: {props.rolls}</h4>
            <h4>Time: {props.timer}</h4>
            <h4>Best: {props.bestScore===Number.MAX_VALUE ? ' --' : props.bestScore}</h4>
        </div>
    )
}