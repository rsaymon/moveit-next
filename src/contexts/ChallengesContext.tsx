import { createContext, useState, ReactNode } from 'react';
import challenges from '../../challenges.json'

//criando o tipo Challenge que informa os dados do desafio.
interface Challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

//criando o tipo ChallengesContextData.
interface ChallengesConstextData{
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    levelUp: ()=>void;
    startNewChallenge: ()=> void;
    activeChallenge: Challenge;
    resetChallenge: ()=> void;
    experienceToNextLevel: number;
}


//definir um tipo para o childre, facilitando a identificação da tipagem
interface ChallengesProviderProps {
    children: ReactNode;
}
//contexto segue o formato da interface ChallengesConstextData.
export const ChallengesContext = createContext({} as ChallengesConstextData);

//Facilitando a identificação da tipagem, tipo passado!
export function ChallengesProvider( {children}: ChallengesProviderProps ){

    //preencher informações que eu quero passar entre componentes no ChallengesProviderProps
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const experienceToNextLevel = Math.pow((level + 1)*4 ,2);
    
    function levelUp(){
      setLevel(level+1);
    }

    function startNewChallenge(){
        //math.floor arrendodar pra baixo, pega o inteiro.
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        
        setActiveChallenge(challenge);
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    
    return(
    // Todos os elementos dentro do provider terão acesso aos dados do contexto de Challenges.
    // Neste caso, o contexto é toda a app, para que haja comunicação entre todos os componentes.
        <ChallengesContext.Provider value={{ level, currentExperience, challengesCompleted, levelUp, startNewChallenge, activeChallenge, resetChallenge, experienceToNextLevel }}>
            {children}
        </ChallengesContext.Provider>
    )
}