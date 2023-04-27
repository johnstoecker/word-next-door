import "./styles.css";
import { useState } from "react";
import Game from "./Game";

const words = [
"from",
"that",
"this",
"with",
"your",
"have",
"more",
"will",
"home",
"page",
"free",
"time",
"they",
"site",
"what",
"news",
"only",
"when",
"here",
"also",
"help",
"view",
"been",
"were",
"some",
"like",
"than",
"find",
"date",
"back",
"list",
"name",
"just",
"over",
"year",
"into",
"next",
"used",
"work",
"last",
"most",
"data",
"make",
"them",
"post",
"city",
"such",
"best",
"then",
"good",
"info",
"high",
"each",
"very",
"book",
"read",
"need",
"many",
"user",
"said",
"does",
"mail",
"full",
"life",
"know",
"days",
"part",
"real",
"item",
"must",
"made",
"line",
"send",
"type",
"take",
"area",
"want",
"long",
"code",
"show",
"even",
"much",
"sign",
"file",
"link",
"open",
"case",
"same",
"both",
"game",
"care",
"down",
"size",
"shop",
"text",
"rate",
"form",
"love",
"main"
];

export default function App() {
  const today = new Date();
  const index = (today.getMonth()*31+today.getDate())%(words.length);
  const word = words[index];
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
