import { Link } from 'react-router-dom'
import './RappelCriteres.css'

export default function RappelCriteres({ ligne1, ligne2, action = 'Modifier', to = '/recherche' }) {
  return (
    <Link to={to} className="rappel-criteres">
      <img src="/assets/icons/recherche.svg" alt="" width="20" height="20" />
      <div className="rappel-criteres__texte">
        <p className="rappel-criteres__ligne1">{ligne1}</p>
        {ligne2 && <p className="rappel-criteres__ligne2">{ligne2}</p>}
      </div>
      <span className="rappel-criteres__action">{action}</span>
    </Link>
  )
}
