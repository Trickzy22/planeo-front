import './Alerte.css'

export default function Alerte({ titre, message, type = 'info' }) {
  const icone = type === 'erreur' ? '/assets/icons/alerte.svg' : '/assets/icons/etincelle.svg'

  return (
    <div className={`alerte alerte--${type}`} role="status">
      <span className="alerte__pastille">
        <img src={icone} alt="" width="18" height="18" />
      </span>
      <div className="alerte__texte">
        <p className="alerte__titre">{titre}</p>
        <p className="alerte__message">{message}</p>
      </div>
    </div>
  )
}
