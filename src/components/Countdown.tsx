import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';



export function Countdown(){
    
    const { minutes, seconds, hasFinished, isActive, startCountdown, resetCountdown } = useContext(CountdownContext);

    //formatando dado para visualizar melhor
    const [minuteLeft, minuteRight] = String(minutes).padStart(2,'0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2,'0').split(''); 

    return(
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>


            {/* Uso do if/then/else */}
            {/* Se hasFinished é verdade, <p>, se não null */}
            {/* outra forma é usar o if/then, sem else */}
            {/*     {hasFinished && (<p>Terminou</p>)}      */}

            
            {/* IF RESPONSÁVEL POR EXIBIR O BOTÃO DE CICLO ENCERRADO */}
            {hasFinished ? (
                <button disabled 
                className={styles.countdownButton}
            >
                CICLO ENCERRADO!
            </button>
            ): (
                // FRAGMENT <> -> div para resolver limitação que não é exibida no html.
                <>
                    {isActive ? (
                    <button type="button" 
                        className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                        onClick={resetCountdown} 
                    >
                        ABANDONAR CICLO!
                    </button>
                    ) : (
                    <button type="button" 
                        className={styles.countdownButton}
                        onClick={startCountdown} 
                    >
                        INICIAR CICLO!
                    </button>
                    )};
                </>
            )} 
        </div>
    );
}