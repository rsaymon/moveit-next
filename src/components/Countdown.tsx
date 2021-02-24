import { useState, useEffect } from 'react';
import styles from '../styles/components/Countdown.module.css';

export function Countdown(){
    const [time, setTime] = useState(25 * 60);
    const [active, setActive] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2,'0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2,'0').split('');

    function startCountdown(){
        setActive(true);

    }

    useEffect(()=>{
        if(active && time > 0){
            //setTimeOut -> algo aconteça depois de algum tempo
            //Nesse caso, executar uma função após 1 segundo
            //função executada é a setTime tirando 1 segundo da variável time
            setTimeout(()=>{setTime(time-1)},1000)
        }
    }, [active, time]) //sempre que active ou o time mudar, acione a função

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
        <button type="button" 
            className={styles.countdownButton}
            onClick={startCountdown} 
        >
            Iniciar um ciclo!
        </button>
        
        </div>
    );
}