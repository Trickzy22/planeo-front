import './Badge.css'

export default function Badge({ libelle, couleur = 'bleu', icone }) {
  return (
    <span className={`badge badge--${couleur}`}>
      {icone && <img src={icone} alt="" width="14" height="14" />}
      {libelle}
    </span>
  )
}
