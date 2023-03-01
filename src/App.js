import React from "react"
import Die from "./components/Die"
import "./style.css"

export default function App() {
  return (
    <main className="main-container">
      <div className="dice-container">
        <Die value="5" />
        <Die value="5" />
        <Die value="6" />
        <Die value="2" />
        <Die value="4" />
        <Die value="1" />
        <Die value="3" />
        <Die value="4" />
        <Die value="6" />
        <Die value="1" />
        </div>
    </main>
  );
}
