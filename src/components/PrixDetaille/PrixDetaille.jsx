import LigneDePrix from '../LigneDePrix/LigneDePrix'
import './PrixDetaille.css'

function formaterPrix(montant) {
  return `${montant.toLocaleString('fr-FR').replace(/\s/g, ' ')} €`
}

export default function PrixDetaille({ lignes, total }) {
  return (
    <div className="prix-detaille">
      <p className="prix-detaille__titre">Prix global estimé</p>
      {lignes.map((ligne) => (
        <LigneDePrix key={ligne.libelle} libelle={ligne.libelle} montant={formaterPrix(ligne.montant)} />
      ))}
      <div className="prix-detaille__separateur" />
      <LigneDePrix total libelle="Total estimé" montant={formaterPrix(total)} />
    </div>
  )
}
