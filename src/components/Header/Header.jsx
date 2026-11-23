import { Link } from 'react-router-dom'
import './Header.css'

export default function Header({ onMenuClick }) {
  return (
    <header className="header">
      <button className="header__menu" onClick={onMenuClick} aria-label="Ouvrir le menu">
        <img src="/assets/icons/menu.svg" alt="" width="20" height="20" />
      </button>
      <Link to="/" className="header__logo">
        Planeo<span>.</span>
      </Link>
      <Link to="/contact" className="header__contact">
        Contact
      </Link>
    </header>
  )
}
