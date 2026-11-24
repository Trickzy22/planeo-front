import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import LienRetour from '../../components/LienRetour/LienRetour'
import TitreSection from '../../components/TitreSection/TitreSection'
import ListeOnglets from '../../components/Onglet/ListeOnglets'
import Champ from '../../components/Champ/Champ'
import Bouton from '../../components/Bouton/Bouton'
import Chargement from '../../components/Chargement/Chargement'
import MessageErreur from '../../components/MessageErreur/MessageErreur'
import { useRecherche } from '../../context/RechercheContext'
import { recupererDonnees, envoyerDonnees } from '../../services/api'
import './Recherche.css'

export default function Recherche() {
  const navigate = useNavigate()
  const { criteres, modifierCritere, reinitialiser } = useRecherche()
  const [typesEvenement, setTypesEvenement] = useState([])
  const [chargement, setChargement] = useState(true)
  const [erreurChargement, setErreurChargement] = useState('')
  const [erreurs, setErreurs] = useState({})
  const [envoiEnCours, setEnvoiEnCours] = useState(false)
  const [erreurEnvoi, setErreurEnvoi] = useState('')

  useEffect(() => {
    document.title = 'Votre recherche · Planeo'

    recupererDonnees('typesEvenement')
      .then((donnees) => setTypesEvenement(donnees.map((type) => type.titre)))
      .catch(() => setErreurChargement('Impossible de charger les types d’événements.'))
      .finally(() => setChargement(false))
  }, [])

  const changerCritere = (nom, valeur) => {
    modifierCritere(nom, valeur)
    setErreurs((precedentes) => ({ ...precedentes, [nom]: undefined }))
  }

  const toutEffacer = () => {
    reinitialiser()
    setErreurs({})
    setErreurEnvoi('')
  }

  const valider = (event) => {
    event.preventDefault()
    const nouvellesErreurs = {}
    if (!criteres.date) nouvellesErreurs.date = 'Indiquez une date.'
    if (!criteres.invites || Number(criteres.invites) <= 0) nouvellesErreurs.invites = 'Indiquez un nombre d’invités valide.'
    setErreurs(nouvellesErreurs)

    if (Object.keys(nouvellesErreurs).length > 0) return

    setEnvoiEnCours(true)
    setErreurEnvoi('')
    envoyerDonnees('recherches', criteres)
      .then(() => navigate('/resultats'))
      .catch(() => setErreurEnvoi('La recherche n’a pas pu être envoyée. Réessayez.'))
      .finally(() => setEnvoiEnCours(false))
  }

  return (
    <div className="page recherche">
      <Header />

      <main>
      <form className="recherche__contenu" onSubmit={valider} noValidate>
        <div className="recherche__haut">
          <LienRetour libelle="Retour" />
          <TitreSection principal surtitre="Votre recherche" titre="Racontez-nous" motSurligne="votre événement" />
        </div>

        <div className="recherche__formulaire">
          <h2 className="recherche__question">Quel événement ?</h2>
          {chargement && <Chargement />}
          {erreurChargement && <MessageErreur message={erreurChargement} avecReessayer />}
          {!chargement && !erreurChargement && (
            <ListeOnglets
              options={typesEvenement}
              valeur={criteres.typeEvenement}
              onChange={(valeur) => changerCritere('typeEvenement', valeur)}
            />
          )}
          <Champ
            id="date"
            label="Date"
            type="date"
            icone="/assets/icons/calendrier.svg"
            valeur={criteres.date}
            onChange={(valeur) => changerCritere('date', valeur)}
            valide
            erreur={erreurs.date}
          />
          <Champ
            id="invites"
            label="Invités"
            type="number"
            placeholder="120"
            icone="/assets/icons/invites.svg"
            valeur={criteres.invites}
            onChange={(valeur) => changerCritere('invites', valeur)}
            valide
            erreur={erreurs.invites}
          />
          <Champ
            id="budget"
            label="Budget global"
            type="number"
            placeholder="15 000 €"
            icone="/assets/icons/budget.svg"
            valeur={criteres.budget}
            onChange={(valeur) => changerCritere('budget', valeur)}
          />
          {erreurEnvoi && <MessageErreur message={erreurEnvoi} />}
        </div>

        <div className="recherche__actions">
          <Bouton variante="texte" onClick={toutEffacer}>
            Tout effacer
          </Bouton>
          <Bouton variante="primaire" type="submit" icone="/assets/icons/recherche.svg" desactive={envoiEnCours}>
            {envoiEnCours ? 'Envoi…' : 'Rechercher'}
          </Bouton>
        </div>
      </form>
      </main>
    </div>
  )
}
