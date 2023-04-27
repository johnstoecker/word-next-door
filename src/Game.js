import "./styles.css";
import { useState } from "react";
import { levenshtein, isWord } from "./wordLib";

export default function Game(props) {
  const wordOfTheDay = props.word;
  const targetScore = props.targetScore;
  const [wordError, setWordError] = useState("");
  const [finishMessage, setFinishMessage] = useState("");
  const [currentWord, setCurrentWord] = useState("");
  const [wordMap, setWordMap] = useState({});
  const [score, setScore] = useState(0);

  const finishGame = () => {
    const endTime = new Date();
    var timeDiff = endTime - props.timerStart; //in ms
    // strip the ms
    timeDiff /= 1000;

    // get seconds
    var seconds = Math.round(timeDiff);
    setFinishMessage(`You won! Your time was ${seconds} seconds`);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!isWord(currentWord)) {
      setWordError(`${currentWord} not found in dictionary`);
      setCurrentWord("");
      return;
    }
    if (currentWord.length < 4) {
      setWordError("word must be > 4 characters");
      setCurrentWord("");
      return;
    }
    if (currentWord === wordOfTheDay) {
      setWordError("cannot use word of the day");
      setCurrentWord("");
      return;
    }
    const distanceFromTopWord = levenshtein(currentWord, wordOfTheDay);
    for (let i = 1; i <= distanceFromTopWord + 1; i++) {
      if (wordMap[i] == null) {
        wordMap[i] = {};
      }
    }
    if (wordMap[distanceFromTopWord][currentWord]) {
      setWordError(`already guessed ${currentWord}`);
      setCurrentWord("");
      return;
    }
    if (distanceFromTopWord === 1) {
      const oneWords = wordMap[1];
      oneWords[currentWord] = true;
    } else {
      if (!doesCurrentWordHaveCurrentNeighbor(distanceFromTopWord)) {
        setWordError(
          `${currentWord} must be neighbor of ${wordOfTheDay} or your current word cloud`
        );
        setCurrentWord("");
        return;
      }
      wordMap[distanceFromTopWord][currentWord] = true;
    }
    setWordError("");
    setCurrentWord("");
    setWordMap(wordMap);
    if (score + distanceFromTopWord >= targetScore) {
      finishGame();
    }
    setScore(score + distanceFromTopWord);
  };

  const doesCurrentWordHaveCurrentNeighbor = (distance) => {
    for (let i = distance - 1; i <= distance + 1; i++) {
      const wordsToCheck = Object.keys(wordMap[i]);
      for (let i = 0; i < wordsToCheck.length; i++) {
        if (levenshtein(wordsToCheck[i], currentWord) === 1) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <div className="App">
      <h2>{finishMessage}</h2>
      <p>
        The word of the day is <b>{wordOfTheDay}</b>
      </p>
      <p>
        Current score: {score}/{targetScore}
      </p>
      {score < targetScore && (
        <form onSubmit={onFormSubmit}>
          <input
            type="text"
            value={currentWord}
            onChange={(e) => setCurrentWord(e.target.value.toLocaleLowerCase())}
          />
        </form>
      )}
      <p>{wordError}</p>
      <div className="distanceContainer">
        {Object.keys(wordMap).map((value) => (
          <div key={value} className="distanceBox">
            {value}
            {Object.keys(wordMap[value]).map((word) => (
              <div key={word}>{word}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
