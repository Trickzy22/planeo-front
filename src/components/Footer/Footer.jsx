import './Footer.css'

const colonnes = [
  { titre: 'Planeo', liens: ['Nos salles', 'Salles partenaires', 'Recherche sur mesure'] },
  { titre: 'Événements', liens: ['Mariage', 'Séminaire', 'Réalisations'] },
]

const reseaux = [
  { nom: 'Instagram', icone: '/assets/icons/instagram.svg', href: '#' },
  { nom: 'LinkedIn', icone: '/assets/icons/linkedin.svg', href: '#' },
  { nom: 'Email', icone: '/assets/icons/email.svg', href: 'mailto:contact@planeo.fr' },
]

export default function Footer({
  accroche = 'Le bon lieu, à votre date. Un seul interlocuteur du devis au jour J.',
  mentions = 'Mentions légales · CGV · © 2026 Planeo',
}) {
  return (
    <footer className="footer">
      <div className="footer__logo">
        planeo
        <img src="/assets/icons/point.svg" alt="" width="9" height="9" />
      </div>
      <p className="footer__accroche">{accroche}</p>
      <div className="footer__liens">
        {colonnes.map((colonne) => (
          <div key={colonne.titre} className="footer__colonne">
            <p className="footer__titre-colonne">{colonne.titre}</p>
            {colonne.liens.map((lien) => (
              <a key={lien} href="#">
                {lien}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="footer__reseaux">
        {reseaux.map((reseau) => (
          <a key={reseau.nom} href={reseau.href} className="footer__pastille" aria-label={reseau.nom}>
            <img src={reseau.icone} alt="" width="20" height="20" />
          </a>
        ))}
      </div>
      <p className="footer__mentions">{mentions}</p>
    </footer>
  )
}
