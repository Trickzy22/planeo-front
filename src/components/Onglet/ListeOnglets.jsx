import Onglet from './Onglet'
import './Onglet.css'

export default function ListeOnglets({ options, valeur, onChange }) {
  return (
    <div className="liste-onglets">
      {options.map((option) => (
        <Onglet key={option} libelle={option} actif={option === valeur} onClick={() => onChange(option)} />
      ))}
    </div>
  )
}
