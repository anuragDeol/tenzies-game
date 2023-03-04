import React from "react";

export default function Die(props) {
    // console.log(props)
    const dieFaceValue = props.die.value
    return (
        <div 
            className={`die-face${props.die.isHeld ? "-green" : ""}`}
            onClick={props.handleClick}
        >
            <div className="die-num">
                <div className="die-num-row">
                    {<div style={(dieFaceValue > 1) ? {backgroundColor: "rgb(80, 80, 80)"} : {backgroundColor: "offwhite"}} className="die-face-one"></div>}
                    {<div style={(dieFaceValue === 6) ? {backgroundColor: "rgb(80, 80, 80)"} : {backgroundColor: "offwhite"}} className="die-face-four"></div>}
                    {<div style={(dieFaceValue >= 4) ? {backgroundColor: "rgb(80, 80, 80)"} : {backgroundColor: "offwhite"}} className="die-face-seven"></div>}
                </div>
                <div className="die-num-row">
                    {<div style={{backgroundColor: "offwhite"}} className="die-face-two"></div>}
                    {<div style={((dieFaceValue%2 !== 0)) ? {backgroundColor: "rgb(80, 80, 80)"} : {backgroundColor: "offwhite"}} className="die-face-five"></div>}
                    {<div style={{backgroundColor: "offwhite"}} className="die-face-eight"></div>}
                </div>
                <div className="die-num-row">
                    {<div style={(dieFaceValue >= 4) ? {backgroundColor: "rgb(80, 80, 80)"} : {backgroundColor: "offwhite"}} className="die-face-three"></div>}
                    {<div style={(dieFaceValue === 6) ? {backgroundColor: "rgb(80, 80, 80)"} : {backgroundColor: "offwhite"}} className="die-face-six"></div>}
                    {<div style={(dieFaceValue > 1) ? {backgroundColor: "rgb(80, 80, 80)"} : {backgroundColor: "offwhite"}} className="die-face-nine"></div>}
                </div>
                {/* {dieFaceValue} */}
            </div>
        </div>
    )
}