import './Chargement.css'

export default function Chargement({ texte = 'Chargement…' }) {
  return (
    <div className="chargement" role="status">
      <span className="chargement__rond" />
      {texte}
    </div>
  )
}
