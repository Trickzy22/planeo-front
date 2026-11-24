import { Routes, Route } from 'react-router-dom'
import { RechercheProvider } from './context/RechercheContext'
import Accueil from './pages/Accueil/Accueil'
import Recherche from './pages/Recherche/Recherche'
import Resultats from './pages/Resultats/Resultats'
import FicheSalle from './pages/FicheSalle/FicheSalle'
import DemandeDevis from './pages/DemandeDevis/DemandeDevis'
import Confirmation from './pages/Confirmation/Confirmation'

export default function App() {
  return (
    <RechercheProvider>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/recherche" element={<Recherche />} />
        <Route path="/resultats" element={<Resultats />} />
        <Route path="/salles/:id" element={<FicheSalle />} />
        <Route path="/salles/:id/devis" element={<DemandeDevis />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </RechercheProvider>
  )
}
