import React from 'react'
import './GameOver.css'
const GameOver = ({retry,score}) => {
    return (
        <div>
            <h1>Você perdeu! Mais sorte na proxima.</h1>
            <h2>Sua Pontuação foi <span className='score'>{score}</span></h2>
            <button onClick={retry}>Tentar de novo</button>
        </div>
    )
}

export default GameOver