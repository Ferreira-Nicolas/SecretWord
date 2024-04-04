import React from 'react'
import './StartScreen.css'
// import logoSecrectWord from '../imgs/secretWord.png'
const StartScreen = ({ startGame }) => {
    return (
        <div className='start'>
            <h1>
                <span className='secrect_logo'>Secrect  </span>
                <span className='word_logo' >  Word</span>
            </h1>
        
            <button onClick={startGame} >Play!</button>
        </div>
    )
}

export default StartScreen