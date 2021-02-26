import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox(){

    //utilizando as informações para compartilhar entre componentes
    const {activeChallenge, resetChallenge, completeChallenge} = useContext(ChallengesContext);
    const {resetCountdown} = useContext(CountdownContext);

    function handdleChallengeSucceeded(){
        completeChallenge();
        resetCountdown();
    }

    function handdleChallengeFailed(){
        resetChallenge();
        resetCountdown();
    }

    return(
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount}xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`}/>
                        <strong>Novo desafio!</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button onClick={handdleChallengeFailed} type="button" className={styles.challengeFailedButton}>
                            Falhei!
                        </button>
                        <button onClick={handdleChallengeSucceeded} type="button" className={styles.challengeSucceededButton}>
                            Completei!
                        </button>

                    </footer>
                </div>
            ) : (
                <div className={styles.challengeNotActive}>
                    <strong>Finalize um ciclo para iniciar um novo desafio!</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up"/>
                        Avance de level completando desafios!
                    </p>
                </div>
            )}
        </div>
    );
}
