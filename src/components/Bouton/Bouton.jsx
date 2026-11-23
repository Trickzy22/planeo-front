import { Link } from 'react-router-dom'
import './Bouton.css'

export default function Bouton({ children, variante = 'primaire', icone, iconeDroite, to, onClick, type = 'button', desactive = false, pleineLargeur = false }) {
  let classes = `bouton bouton--${variante}`
  if (pleineLargeur) classes += ' bouton--pleine-largeur'

  const contenu = (
    <>
      {icone && <img src={icone} alt="" width="20" height="20" />}
      <span>{children}</span>
      {iconeDroite && <img src={iconeDroite} alt="" width="20" height="20" />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes}>
        {contenu}
      </Link>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={desactive}>
      {contenu}
    </button>
  )
}
