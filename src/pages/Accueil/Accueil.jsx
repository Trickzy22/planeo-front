import { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import TitreSection from '../../components/TitreSection/TitreSection'
import BarreRecherche from '../../components/BarreRecherche/BarreRecherche'
import Carrousel from '../../components/Carrousel/Carrousel'
import CarteRealisation from '../../components/CarteRealisation/CarteRealisation'
import CarteSalle from '../../components/CarteSalle/CarteSalle'
import CarteTypeEvenement from '../../components/CarteTypeEvenement/CarteTypeEvenement'
import ListeOnglets from '../../components/Onglet/ListeOnglets'
import Bouton from '../../components/Bouton/Bouton'
import BlocCta from '../../components/BlocCta/BlocCta'
import Chargement from '../../components/Chargement/Chargement'
import MessageErreur from '../../components/MessageErreur/MessageErreur'
import { recupererDonnees } from '../../services/api'
import './Accueil.css'

const filtresSalles = {
  Toutes: null,
  Planeo: 'planeo',
  Partenaires: 'partenaire',
}

export default function Accueil() {
  const [realisations, setRealisations] = useState([])
  const [salles, setSalles] = useState([])
  const [typesEvenement, setTypesEvenement] = useState([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState('')
  const [filtre, setFiltre] = useState('Toutes')

  useEffect(() => {
    document.title = 'Planeo · Le bon lieu, à votre date'

    Promise.all([recupererDonnees('realisations'), recupererDonnees('salles'), recupererDonnees('typesEvenement')])
      .then(([donneesRealisations, donneesSalles, donneesTypes]) => {
        setRealisations(donneesRealisations)
        setSalles(donneesSalles)
        setTypesEvenement(donneesTypes)
      })
      .catch(() => setErreur('Impossible de charger les données. Vérifiez que l’API est lancée.'))
      .finally(() => setChargement(false))
  }, [])

  const sallesFiltrees = filtresSalles[filtre]
    ? salles.filter((salle) => salle.type === filtresSalles[filtre])
    : salles

  return (
    <div className="page accueil">
      <Header />

      <section className="accueil__hero">
        <div className="accueil__hero-degrade" />
        <div className="accueil__hero-contenu">
          <TitreSection
            principal
            ton="fonce"
            surtitre="Agence événementielle"
            titre="Le bon lieu,"
            motSurligne="à votre date"
          />
          <p className="accueil__hero-texte">
            Salle, déco, technique, traiteur : un seul interlocuteur, du devis au jour J.
          </p>
          <BarreRecherche />
        </div>
      </section>

      <div className="accueil__sections">
        {chargement && <Chargement />}

        {erreur && (
          <div className="conteneur">
            <MessageErreur message={erreur} avecReessayer />
          </div>
        )}

        {!chargement && !erreur && (
          <>
            <section className="accueil__section">
              <div className="conteneur">
                <TitreSection taille="moyen" surtitre="Réalisations" titre="Ils ont dit" motSurligne="oui" />
              </div>
              <Carrousel>
                {realisations.map((realisation) => (
                  <CarteRealisation key={realisation.id} {...realisation} />
                ))}
              </Carrousel>
            </section>

            <section className="accueil__section">
              <div className="conteneur accueil__entete-salles">
                <TitreSection taille="moyen" surtitre="Nos salles" titre={`${salles.length} lieux`} motSurligne="Incroyable" />
                <ListeOnglets options={Object.keys(filtresSalles)} valeur={filtre} onChange={setFiltre} />
              </div>
              <Carrousel key={filtre}>
                {sallesFiltrees.map((salle) => (
                  <CarteSalle key={salle.id} {...salle} />
                ))}
              </Carrousel>
              <div className="conteneur">
                <Bouton variante="secondaire" to="/salles" pleineLargeur>
                  Voir toutes les salles
                </Bouton>
              </div>
            </section>

            <section className="accueil__section">
              <div className="conteneur">
                <TitreSection taille="moyen" surtitre="Types d’événements" titre="Un format," motSurligne="votre style" />
              </div>
              <Carrousel afficherPagination={false}>
                {typesEvenement.map((type) => (
                  <CarteTypeEvenement key={type.id} {...type} />
                ))}
              </Carrousel>
            </section>
          </>
        )}

        <div className="conteneur">
          <BlocCta />
        </div>

        <Footer />
      </div>
    </div>
  )
}
