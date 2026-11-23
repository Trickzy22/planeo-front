import './CarteRealisation.css'

export default function CarteRealisation({ categorie, titre, infos, image }) {
  return (
    <article className="carte-realisation">
      <img className="carte-realisation__visuel" src={image} alt={titre} loading="lazy" />
      <div className="carte-realisation__texte">
        <p className="carte-realisation__categorie">{categorie}</p>
        <h3 className="carte-realisation__titre">{titre}</h3>
        <p className="carte-realisation__infos">{infos}</p>
      </div>
    </article>
  )
}
