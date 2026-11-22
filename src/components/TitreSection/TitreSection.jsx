import './TitreSection.css'

export default function TitreSection({ surtitre, titre, motSurligne, taille = 'grand', ton = 'clair', principal = false }) {
  const contenu = (
    <>
      {titre} {motSurligne && <span className="titre-section__surligne">{motSurligne}</span>}
    </>
  )

  return (
    <div className={`titre-section titre-section--${taille} titre-section--${ton}`}>
      {surtitre && <p className="titre-section__surtitre">{surtitre}</p>}
      {principal ? <h1 className="titre-section__titre">{contenu}</h1> : <h2 className="titre-section__titre">{contenu}</h2>}
    </div>
  )
}
