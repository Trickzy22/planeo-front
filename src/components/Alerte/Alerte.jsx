import './Alerte.css'

export default function Alerte({ titre, message }) {
  return (
    <div className="alerte" role="status">
      <span className="alerte__pastille">
        <img src="/assets/icons/etincelle.svg" alt="" width="18" height="18" />
      </span>
      <div className="alerte__texte">
        <p className="alerte__titre">{titre}</p>
        <p className="alerte__message">{message}</p>
      </div>
    </div>
  )
}
