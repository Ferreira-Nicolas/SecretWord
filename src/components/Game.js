import React, { useState, useRef } from 'react'
import './Game.css'



const Game = ({ verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score, }) => {

  const [letter, setLetter] = useState('');
  const letterInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyLetter(letter);
    setLetter('');
    letterInputRef.current.focus()
    letterInputRef.current.value = ''
  }
  
  return (
    <div className='game'>


      <h1>Adivinhe a palavra!</h1>

      <h3 className="tip">
        Dica sobre a a palavra: <span className='category'>{pickedCategory}</span>
      </h3>
      <p className='points'>
        <span>Pontuação: <span className='score'>{score}</span></span>
      </p>

      <p>Você ainda tem <span className='guesses'>{guesses}</span> tentativa(s)</p>

      <div className="wordContainer">
        {letters.map((letter, i) => (
          guessedLetters.includes(letter) ? (

            <span key={i} className='letter'>
              {letter}
            </span>

          )
            : (
              <span key={i} className='blankSquare'>

              </span>
            )))
        }
      </div>

      <div className="letterContainer">

        <p>Tente advinha uma letra da palavra</p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name='letter'
            maxLength='1'
            onChange={(e)=> setLetter(e.target.value)}
            ref={letterInputRef}
            required />
          <button>Jogar</button>

        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter}, </span>
        ))}
      </div>


    </div>
  )
}

export default Game