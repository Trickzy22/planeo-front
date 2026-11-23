import { Routes, Route } from 'react-router-dom'
import { RechercheProvider } from './context/RechercheContext'
import Accueil from './pages/Accueil/Accueil'

export default function App() {
  return (
    <RechercheProvider>
      <Routes>
        <Route path="/" element={<Accueil />} />
      </Routes>
    </RechercheProvider>
  )
}
