import './Onglet.css'

export default function Onglet({ libelle, actif = false, onClick }) {
  return (
    <button type="button" className={`onglet ${actif ? 'onglet--actif' : ''}`} onClick={onClick} aria-pressed={actif}>
      {libelle}
    </button>
  )
}
