import { useNavigate } from 'react-router-dom'
import { useRecherche } from '../../context/RechercheContext'
import './BarreRecherche.css'

export default function BarreRecherche() {
  const navigate = useNavigate()
  const { criteres } = useRecherche()

  const resume = [criteres.typeEvenement, criteres.date, criteres.invites && `${criteres.invites} invités`]
    .filter(Boolean)
    .join(' · ')

  return (
    <button type="button" className="barre-recherche" onClick={() => navigate('/recherche')}>
      <span className="barre-recherche__texte">
        <span className="barre-recherche__titre">Trouver mon lieu</span>
        <span className="barre-recherche__resume">{resume || 'Événement · Date · Invités'}</span>
      </span>
      <span className="barre-recherche__bouton">
        <img src="/assets/icons/recherche-blanc.svg" alt="" width="24" height="24" />
      </span>
    </button>
  )
}
