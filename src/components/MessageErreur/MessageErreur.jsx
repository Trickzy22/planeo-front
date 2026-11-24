import './MessageErreur.css'

export default function MessageErreur({ message, avecReessayer = false }) {
  return (
    <div className="message-erreur" role="alert">
      <p className="message-erreur__texte">{message}</p>
      {avecReessayer && (
        <button type="button" className="message-erreur__bouton" onClick={() => window.location.reload()}>
          Réessayer
        </button>
      )}
    </div>
  )
}
