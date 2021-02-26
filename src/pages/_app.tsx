import { ChallengesProvider } from '../contexts/ChallengesContext'
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  
  
  
  return (
    
    <ChallengesProvider>
      {/* componente que recebe conteúdo dentro dele = CHILDREN */}
      <Component {...pageProps} />
    </ChallengesProvider>
    )}

export default MyApp
