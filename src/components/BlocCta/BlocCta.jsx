import Bouton from '../Bouton/Bouton'
import './BlocCta.css'

export default function BlocCta({
  titre = 'Un projet sur mesure ?',
  texte = 'Décrivez votre événement, on vous rappelle sous 48 h.',
  bouton = 'Prendre contact',
  to = '/contact',
}) {
  return (
    <section className="bloc-cta">
      <h2 className="bloc-cta__titre">{titre}</h2>
      <p className="bloc-cta__texte">{texte}</p>
      <div>
        <Bouton variante="blanc" to={to} iconeDroite="/assets/icons/fleche-droite.svg">
          {bouton}
        </Bouton>
      </div>
    </section>
  )
}
