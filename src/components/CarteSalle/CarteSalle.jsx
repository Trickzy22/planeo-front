import { Link } from 'react-router-dom'
import Badge from '../Badge/Badge'
import './CarteSalle.css'

export default function CarteSalle({ id, nom, lieu, invites, type, image }) {
  const estPlaneo = type === 'planeo'

  return (
    <Link to={`/salles/${id}`} className="carte-salle">
      <img className="carte-salle__visuel" src={image} alt={nom} loading="lazy" />
      <div className="carte-salle__contenu">
        <div>
          {estPlaneo ? (
            <Badge libelle="Salle Planeo" couleur="bleu" icone="/assets/icons/etincelle.svg" />
          ) : (
            <Badge libelle="Partenaire" couleur="orange" />
          )}
        </div>
        <h3 className="carte-salle__nom">{nom}</h3>
        <p className="carte-salle__infos">
          <img src="/assets/icons/lieu.svg" alt="" width="16" height="16" />
          {lieu} · {invites} invités
        </p>
      </div>
    </Link>
  )
}
