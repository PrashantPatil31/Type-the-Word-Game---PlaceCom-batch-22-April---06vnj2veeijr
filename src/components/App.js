import React, { useState, useEffect } from 'react';
import "../styles/App.css"

const WORD_LIST = ['apple', 'banana', 'cherry', 'grape', 'orange'];

function App() {
  const [word, setWord] = useState('');
  const [flashWord, setFlashWord] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlashWord(false);
    }, 500);
    setWord(WORD_LIST[index]);
    return () => clearInterval(interval);
  }, [index]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (userInput.toLowerCase() === word.toLowerCase()) {
      setResult('You won!');
    } else {
      setResult('You Lost!');
    }
  }

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  }

  const handleRestartClick = () => {
    setFlashWord(true);
    setUserInput('');
    setResult('');
    setIndex(0);
  }

  return (
    <div class="mini-game-container">
      <h2 class="mini-game-title">Mini Game</h2>
      {flashWord && <p class="mini-game-word">{word}</p>}
      {!flashWord && (
        <form class="mini-game-form" onSubmit={handleFormSubmit}>
          <input class="mini-game-input" type="text" value={userInput} onChange={handleInputChange} />
          <button class="mini-game-button" type="submit">Check Answer</button>
        </form>
      )}
      {result && (
        <>
          <p class="mini-game-result">{result}</p>
          <button class="mini-game-restart-button" onClick={handleRestartClick}>Restart</button>
        </>
      )}
    </div>
  );
}

export default App;
