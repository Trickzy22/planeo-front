import './MessageErreur.css'

export default function MessageErreur({ message }) {
  return (
    <p className="message-erreur" role="alert">
      {message}
    </p>
  )
}
