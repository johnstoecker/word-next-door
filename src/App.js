import "./styles.css";
import { useState } from "react";
import Game from "./Game";

export default function App() {
  const word = "dark";
  const targetScore = 250;
  const [showGame, setShowGame] = useState(false);
  const [timerStart, setTimerStart] = useState();
  const startGame = () => {
    setTimerStart(new Date());
    setShowGame(true);
  };

  return (
    <div className="App">
      <h1>Words Next Door</h1>
      {!showGame && (
        <div>
          <p>
            You start with a given word (e.g. "dark"). The object is to quickly
            type word neighbors.
          </p>
          <p> Type neighbors of the starting word (e.g. "dark" => "lark".</p>
          <p>
            Then find neighbors of your neighbors (e.g. lark => lank => plank)
          </p>
          <p>You get more points the further from the starting word you are.</p>
          <p>Get {targetScore} points as quickly as you can!</p>
          <p></p>
          <p></p>
          <button onClick={startGame}>Start</button>
        </div>
      )}
      {showGame && (
        <Game targetScore={targetScore} word={word} timerStart={timerStart} />
      )}
    </div>
  );
}
