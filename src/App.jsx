import { Routes, Route } from 'react-router-dom'
import { RechercheProvider } from './context/RechercheContext'
import Accueil from './pages/Accueil/Accueil'
import Recherche from './pages/Recherche/Recherche'

export default function App() {
  return (
    <RechercheProvider>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/recherche" element={<Recherche />} />
      </Routes>
    </RechercheProvider>
  )
}
