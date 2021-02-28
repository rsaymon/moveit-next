import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";


let countdownTimeout: NodeJS.Timeout;


interface CountdownContextData {
        minutes: number;
        seconds: number;
        isActive: boolean;
        hasFinished: boolean;
        startCountdown: ()=> void;
        resetCountdown: ()=> void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({ children }: CountdownProviderProps) {

    //fazendo uso do contexto, recuperando informações de outro componente, no caso, startNewChallenge()
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(15 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;


    function startCountdown(){
        setIsActive(true);

    }

    function resetCountdown(){
        setIsActive(false);
        clearTimeout (countdownTimeout); //pausar o timeout para q ele não desça 1 segundo por já ter rodado.
        setTime(25*60);
        setHasFinished(false);
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


    return (
        <CountdownContext.Provider value={{minutes, seconds, hasFinished, isActive, startCountdown, resetCountdown}}>
            {children}
        </CountdownContext.Provider>
    )

}