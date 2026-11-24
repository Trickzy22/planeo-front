import './CarteRealisation.css'

export default function CarteRealisation({ categorie, titre, infos, image, video = false }) {
  return (
    <article className="carte-realisation">
      <div className="carte-realisation__media">
        <img className="carte-realisation__visuel" src={image} alt={titre} loading="lazy" />
        {video && <img className="carte-realisation__play" src="/assets/icons/play.svg" alt="" width="28" height="28" />}
      </div>
      <div className="carte-realisation__texte">
        <p className="carte-realisation__categorie">{categorie}</p>
        <h3 className="carte-realisation__titre">{titre}</h3>
        <p className="carte-realisation__infos">{infos}</p>
      </div>
    </article>
  )
}
