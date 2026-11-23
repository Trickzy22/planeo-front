import { useNavigate } from 'react-router-dom'
import './LienRetour.css'

export default function LienRetour({ libelle = 'Retour' }) {
  const navigate = useNavigate()

  return (
    <button type="button" className="lien-retour" onClick={() => navigate(-1)}>
      <img src="/assets/icons/fleche-gauche.svg" alt="" width="20" height="20" />
      {libelle}
    </button>
  )
}
