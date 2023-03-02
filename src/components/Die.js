import React from "react";

export default function Die(props) {
    console.log(props)
    return (
        <div 
            className={`die-face${props.die.isHeld ? "-green" : ""}`}
            onClick={props.handleClick}
        >
            <h2 className="die-num">{props.die.value}</h2>
        </div>
    )
}