import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown(){
    //fazendo uso do contexto, recuperando informações de outro componente, no caso, startNewChallenge()
    const {startNewChallenge} = useContext(ChallengesContext);

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2,'0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2,'0').split('');

    function startCountdown(){
        setIsActive(true);

    }

    function resetCountdown(){
        setIsActive(false);
        clearTimeout (countdownTimeout); //pausar o timeout para q ele não desça 1 segundo por já ter rodado.
        setTime(25*60);
    }

    useEffect(()=>{
        if(isActive && time > 0){
            //setTimeOut -> algo aconteça depois de algum tempo
            //Nesse caso, executar uma função após 1 segundo
            //função executada é a setTime tirando 1 segundo da variável time
            countdownTimeout = setTimeout(()=>{setTime(time-1)},1000)
        } else if (isActive && time == 0){
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time]) //sempre que active ou o time mudar, acione a função

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