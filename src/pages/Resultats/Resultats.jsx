import { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import RappelCriteres from '../../components/RappelCriteres/RappelCriteres'
import ListeOnglets from '../../components/Onglet/ListeOnglets'
import CarteSalle from '../../components/CarteSalle/CarteSalle'
import BlocCta from '../../components/BlocCta/BlocCta'
import Chargement from '../../components/Chargement/Chargement'
import MessageErreur from '../../components/MessageErreur/MessageErreur'
import { useRecherche } from '../../context/RechercheContext'
import { recupererDonnees } from '../../services/api'
import './Resultats.css'

const FILTRES = ['Toutes', 'Salles Planeo', 'Partenaires']

// "2027-06-12" -> "12/06/2027"
function formaterDate(dateIso) {
  if (!dateIso) return ''
  const [annee, mois, jour] = dateIso.split('-')
  return `${jour}/${mois}/${annee}`
}


export default function Resultats() {
  const { criteres } = useRecherche()
  const [salles, setSalles] = useState([])
  const [filtre, setFiltre] = useState('Toutes')
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState('')

  useEffect(() => {
    document.title = 'Résultats · Planeo'

    recupererDonnees('salles')
      .then((donnees) => setSalles(donnees))
      .catch(() => setErreur('Impossible de charger les lieux. Vérifiez que l’API est lancée.'))
      .finally(() => setChargement(false))
  }, [])

  // Lieux qui correspondent aux critères (capacité et budget)
  const sallesDisponibles = salles.filter((salle) => {
    const assezGrande = !criteres.invites || salle.invites >= Number(criteres.invites)
    const dansLeBudget = !criteres.budget || salle.prix <= Number(criteres.budget)
    return assezGrande && dansLeBudget
  })

  // Lieux affichés selon l'onglet choisi
  const sallesAffichees = sallesDisponibles.filter((salle) => {
    if (filtre === 'Salles Planeo') return salle.type === 'planeo'
    if (filtre === 'Partenaires') return salle.type === 'partenaire'
    return true
  })

  const nbPlaneo = sallesDisponibles.filter((salle) => salle.type === 'planeo').length
  const nbPartenaires = sallesDisponibles.length - nbPlaneo
  const date = formaterDate(criteres.date)

  const ligne1 = [criteres.typeEvenement, date].filter(Boolean).join(' · ')
  const ligne2 = [
    criteres.invites && `${criteres.invites} invités`,
    criteres.budget && `${Number(criteres.budget).toLocaleString('fr-FR')} €`,
  ]
    .filter(Boolean)
    .join(' · ')


  return (
    <div className="page resultats">
      <Header />

      <main className="resultats__contenu">
        <div className="resultats__criteres">
          <RappelCriteres ligne1={ligne1} ligne2={ligne2} />

          {!chargement && !erreur && sallesDisponibles.length > 0 && (
            <>
              <ListeOnglets options={FILTRES} valeur={filtre} onChange={setFiltre} />
              <div>
                <h1 className="resultats__compteur">
                  {sallesDisponibles.length} {sallesDisponibles.length > 1 ? 'lieux disponibles' : 'lieu disponible'}
                  {date && ` le ${date}`}
                </h1>
                <p className="resultats__detail">
                  {nbPlaneo} {nbPlaneo > 1 ? 'salles' : 'salle'} Planeo · {nbPartenaires}{' '}
                  {nbPartenaires > 1 ? 'salles partenaires' : 'salle partenaire'}
                </p>
              </div>
            </>
          )}
        </div>

        {chargement && <Chargement />}
        {erreur && <MessageErreur message={erreur} />}


        {!chargement && !erreur && (
          <div className="resultats__liste">
            {sallesAffichees.map((salle) => (
              <CarteSalle key={salle.id} {...salle} dispo={date} avecPrix />
            ))}
            <BlocCta
              couleur="bleu"
              titre="Aucun ne vous convient ?"
              texte="Un chargé de projet cherche pour vous, y compris hors catalogue."
              bouton="Recherche sur mesure"
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
