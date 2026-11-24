import { Link } from 'react-router-dom'
import Badge from '../Badge/Badge'
import './CarteSalle.css'

// dispo : date affichée dans le badge vert (ex. "12/06/2027")
// avecPrix : affiche la ligne "Prix global estimé" (page Résultats)
export default function CarteSalle({ id, nom, lieu, invites, type, image, prix, dispo, avecPrix = false }) {
  const estPlaneo = type === 'planeo'

  return (
    <Link to={`/salles/${id}`} className={`carte-salle ${avecPrix ? 'carte-salle--detaillee' : ''}`}>
      <img className="carte-salle__visuel" src={image} alt={nom} loading="lazy" />
      <div className="carte-salle__contenu">
        <div className="carte-salle__badges">
          {estPlaneo ? (
            <Badge libelle="Salle Planeo" couleur="bleu" icone="/assets/icons/etincelle.svg" />
          ) : (
            <Badge libelle="Partenaire" couleur="orange" />
          )}
          {dispo && <Badge libelle={`Dispo le ${dispo}`} couleur="vert" icone="/assets/icons/check-dispo.svg" />}
        </div>
        <h3 className="carte-salle__nom">{nom}</h3>
        <p className="carte-salle__infos">
          <img src="/assets/icons/lieu.svg" alt="" width="16" height="16" />
          {lieu} · {invites} invités
        </p>
        {avecPrix && (
          <div className="carte-salle__prix">
            <span>Prix global estimé</span>
            <span className="carte-salle__pastille-prix">{prix.toLocaleString('fr-FR')} €</span>
          </div>
        )}
      </div>
    </Link>
  )
}
