import React, { useCallback, useEffect, useState } from 'react';
import StartScreen from './components/StartScreen';
import './App.css';
import Game from './components/Game';
import GameOver from './components/GameOver';
import { wordsList } from './data/words';

const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' }
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(5);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * categories.length)];
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];
    return { word, category };
  }, [words]);

  const startGame = useCallback(() => {
    clearLettersStates();
    const { word, category } = pickWordAndCategory();
    const wordLetters = word.split('').map((l) => l.toLowerCase());

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      alert('Você já digitou essa letra!');
      return;
    }
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ]);
      setGuesses((actualGuessed) => actualGuessed - 1)

    }

  };

  const clearLettersStates = () => {

    setGuessedLetters([]);
    setWrongLetters([]);

  }
  // check qty of guesses
  useEffect(() => {
    if (guesses <= 0) {
      // reset all states
      clearLettersStates();
      setGameStage(stages[2].name)
    }
  }, [guesses])



  // win condintion
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];
    if (gameStage === 'game') {
      if (guessedLetters.length === uniqueLetters.length) {
        setScore((actualScore) => actualScore += 100)
        // switch word
        setTimeout(function() {
          startGame()
        }, 1200);
      }
    }
  }, [guessedLetters, letters, gameStage, startGame])


  const retry = () => {
    setScore(0)
    setGuesses(5)
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === 'end' && <GameOver
        retry={retry}
        score={score} />}
    </div>
  );
}

export default App;
