import './LigneDePrix.css'

export default function LigneDePrix({ libelle, montant, total = false }) {
  return (
    <div className={`ligne-de-prix${total ? ' ligne-de-prix--total' : ''}`}>
      <span className="ligne-de-prix__libelle">{libelle}</span>
      <span className="ligne-de-prix__montant">{montant}</span>
    </div>
  )
}
