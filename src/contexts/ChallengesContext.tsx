import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json'
import Cookies from 'js-cookie'
import { LevelUpModal } from '../components/LevelUpModal';

//criando o tipo Challenge que informa os dados do desafio.
interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

//criando o tipo ChallengesContextData.
interface ChallengesConstextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    activeChallenge: Challenge;
    resetChallenge: () => void;
    experienceToNextLevel: number;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}


//definir um tipo para o childre, facilitando a identificação da tipagem
interface ChallengesProviderProps {
    children: ReactNode;
    level : number;
    currentExperience: number;
    challengesCompleted: number;
}


//contexto segue o formato da interface ChallengesConstextData.
export const ChallengesContext = createContext({} as ChallengesConstextData);


//Facilitando a identificação da tipagem, tipo passado! ...rest é um objeto que tem dentro todos menos a children
export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {

    //preencher informações que eu quero passar entre componentes no ChallengesProviderProps
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0 );
    const [activeChallenge, setActiveChallenge] = useState(null);
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    //Criando notificação. Pedindo a permissão. Array vazio indica que será executada uma única vez sempre que entrar nesse espaço.
    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));

    }, [level, currentExperience, challengesCompleted]);

    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false);
    }

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function startNewChallenge() {
        //math.floor arrendodar pra baixo, pega o inteiro.
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        
        new Audio('/notification.mp3').play();
        //notificação criada e tocando áudio
        if (Notification.permission == 'granted') {
            new Notification('Novo desafio 🎉', {
                body: `Valendo ${challenge.amount}xp`
            });
        }


    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            levelUp();
            finalExperience = finalExperience - experienceToNextLevel;
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);

    }




    return (
        // Todos os elementos dentro do provider terão acesso aos dados do contexto de Challenges.
        // Neste caso, o contexto é toda a app, para que haja comunicação entre todos os componentes.
        <ChallengesContext.Provider value={{ level, currentExperience, challengesCompleted, levelUp, startNewChallenge, activeChallenge, resetChallenge, experienceToNextLevel, completeChallenge, closeLevelUpModal }}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal />} 
        </ChallengesContext.Provider>
    )
}