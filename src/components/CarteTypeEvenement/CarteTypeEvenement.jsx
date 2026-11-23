import { Link } from 'react-router-dom'
import './CarteTypeEvenement.css'

export default function CarteTypeEvenement({ titre, description, image, couleur = 'bleu', to = '#' }) {
  const iconeFleche = couleur === 'corail' ? '/assets/icons/fleche-blanche.svg' : '/assets/icons/fleche-sombre.svg'

  return (
    <Link to={to} className={`carte-type carte-type--${couleur}`}>
      <img className="carte-type__visuel" src={image} alt={titre} loading="lazy" />
      <div className="carte-type__texte">
        <h3 className="carte-type__titre">{titre}</h3>
        <p className="carte-type__description">{description}</p>
      </div>
      <div className="carte-type__lien">
        <span>Découvrir</span>
        <span className="carte-type__fleche">
          <img src={iconeFleche} alt="" width="18" height="18" />
        </span>
      </div>
    </Link>
  )
}
