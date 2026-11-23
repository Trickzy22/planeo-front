import { useNavigate } from 'react-router-dom'
import './BarreRecherche.css'

export default function BarreRecherche() {
  const navigate = useNavigate()

  return (
    <button type="button" className="barre-recherche" onClick={() => navigate('/recherche')}>
      <span className="barre-recherche__texte">
        <span className="barre-recherche__titre">Trouver mon lieu</span>
        <span className="barre-recherche__resume">Événement · Date · Invités</span>
      </span>
      <span className="barre-recherche__bouton">
        <img src="/assets/icons/recherche-blanc.svg" alt="" width="24" height="24" />
      </span>
    </button>
  )
}
