import { Routes, Route } from 'react-router-dom'
import Accueil from './pages/Accueil/Accueil'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Accueil />} />
    </Routes>
  )
}
