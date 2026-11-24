import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import LienRetour from '../../components/LienRetour/LienRetour'
import Alerte from '../../components/Alerte/Alerte'
import TitreSection from '../../components/TitreSection/TitreSection'
import Champ from '../../components/Champ/Champ'
import CaseACocher from '../../components/CaseACocher/CaseACocher'
import Bouton from '../../components/Bouton/Bouton'
import Chargement from '../../components/Chargement/Chargement'
import MessageErreur from '../../components/MessageErreur/MessageErreur'
import { useRecherche } from '../../context/RechercheContext'
import { recupererDonnees, envoyerDonnees } from '../../services/api'
import './DemandeDevis.css'

const PRESTATIONS = ['Décoration', 'Technique (son, lumière, vidéo)', 'Traiteur']

function formaterPrix(montant) {
  return `${montant.toLocaleString('fr-FR').replace(/\s/g, ' ')} €`
}

export default function DemandeDevis() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { criteres } = useRecherche()
  const [salle, setSalle] = useState(null)
  const [chargement, setChargement] = useState(true)
  const [erreurChargement, setErreurChargement] = useState('')
  const [formulaire, setFormulaire] = useState({
    typeEvenement: criteres.typeEvenement,
    date: criteres.date.split('-').reverse().join('/'),
    invites: criteres.invites,
    budget: criteres.budget ? formaterPrix(Number(criteres.budget)) : '',
    nom: '',
    email: '',
    telephone: '',
  })
  const [prestationsCochees, setPrestationsCochees] = useState([PRESTATIONS[0], PRESTATIONS[1]])
  const [erreurs, setErreurs] = useState({})
  const [envoiEnCours, setEnvoiEnCours] = useState(false)
  const [erreurEnvoi, setErreurEnvoi] = useState('')

  const nombreErreurs = Object.values(erreurs).filter((message) => message).length

  useEffect(() => {
    recupererDonnees(`salles/${id}`)
      .then((donnees) => {
        setSalle(donnees)
        document.title = `Demande de devis · ${donnees.nom} · Planeo`
      })
      .catch((erreur) =>
        setErreurChargement(
          erreur.message === 'introuvable'
            ? 'Ce lieu n’existe pas.'
            : 'Impossible de charger ce lieu. Vérifiez que l’API est lancée.'
        )
      )
      .finally(() => setChargement(false))
  }, [id])

  const modifier = (nom, valeur) => {
    setFormulaire({ ...formulaire, [nom]: valeur })
    setErreurs({ ...erreurs, [nom]: '' })
  }

  const basculer = (prestation) => {
    if (prestationsCochees.includes(prestation)) {
      setPrestationsCochees(prestationsCochees.filter((p) => p !== prestation))
    } else {
      setPrestationsCochees([...prestationsCochees, prestation])
    }
  }

  const envoyer = (event) => {
    event.preventDefault()
    const nouvellesErreurs = {}
    if (!formulaire.nom.trim()) nouvellesErreurs.nom = 'Indiquez votre nom pour recevoir le devis.'
    if (!formulaire.email.includes('@')) nouvellesErreurs.email = 'Indiquez votre e-mail pour recevoir le devis.'
    if (!formulaire.telephone.trim()) nouvellesErreurs.telephone = 'Indiquez votre téléphone pour recevoir le devis.'
    setErreurs(nouvellesErreurs)

    if (Object.keys(nouvellesErreurs).length > 0) return

    const demande = {
      prenom: formulaire.nom.split(' ')[0],
      lieu: salle.nom,
      evenement: formulaire.typeEvenement,
      date: formulaire.date,
      invites: formulaire.invites,
      prestations: prestationsCochees.join(', '),
      budget: formulaire.budget,
      prixEstime: formaterPrix(salle.prix),
    }

    setEnvoiEnCours(true)
    setErreurEnvoi('')
    envoyerDonnees('demandes', demande)
      .then((demandeEnregistree) => navigate(`/confirmation/${demandeEnregistree.id}`))
      .catch(() => setErreurEnvoi('La demande n’a pas pu être envoyée. Réessayez.'))
      .finally(() => setEnvoiEnCours(false))
  }

  return (
    <div className="page demande-devis">
      <Header />

      {chargement && <Chargement />}

      {erreurChargement && (
        <div className="conteneur demande-devis__erreur">
          <MessageErreur message={erreurChargement} avecReessayer />
        </div>
      )}

      {!chargement && !erreurChargement && (
        <form className="demande-devis__contenu" onSubmit={envoyer} noValidate>
          <div className="demande-devis__haut">
            <LienRetour libelle="Retour à la fiche du lieu" />
            {nombreErreurs > 0 && (
              <Alerte
                type="erreur"
                titre={nombreErreurs === 1 ? '1 champ à compléter' : `${nombreErreurs} champs à compléter`}
                message="La demande n’a pas été envoyée. Votre saisie est conservée."
              />
            )}
            <TitreSection principal surtitre={salle.nom} titre="Demande de" motSurligne="devis" />
            <p className="demande-devis__texte">Réponse sous 48 h, avec un seul interlocuteur du devis au jour J.</p>
          </div>

          <fieldset className="demande-devis__bloc">
            <h2 className="demande-devis__titre">Votre événement</h2>
            <Champ
              id="typeEvenement"
              label="Type d’événement"
              placeholder="Mariage"
              icone="/assets/icons/etincelle-bouton.svg"
              valeur={formulaire.typeEvenement}
              onChange={(valeur) => modifier('typeEvenement', valeur)}
              valide
            />
            <Champ
              id="date"
              label="Date"
              placeholder="12/06/2027"
              icone="/assets/icons/calendrier.svg"
              valeur={formulaire.date}
              onChange={(valeur) => modifier('date', valeur)}
              valide
            />
            <Champ
              id="invites"
              label="Invités"
              placeholder="120"
              icone="/assets/icons/invites.svg"
              valeur={formulaire.invites}
              onChange={(valeur) => modifier('invites', valeur)}
              valide
            />
            <Champ
              id="budget"
              label="Budget global"
              placeholder="15 000 €"
              icone="/assets/icons/budget.svg"
              valeur={formulaire.budget}
              onChange={(valeur) => modifier('budget', valeur)}
              valide
            />
          </fieldset>

          <fieldset className="demande-devis__bloc">
            <h2 className="demande-devis__titre">Prestations souhaitées</h2>
            {PRESTATIONS.map((prestation) => (
              <CaseACocher
                key={prestation}
                libelle={prestation}
                coche={prestationsCochees.includes(prestation)}
                onChange={() => basculer(prestation)}
              />
            ))}
          </fieldset>

          <fieldset className="demande-devis__bloc">
            <h2 className="demande-devis__titre">Vos coordonnées</h2>
            <Champ
              id="nom"
              label="Nom et prénom"
              placeholder="Alexandre Martin"
              valeur={formulaire.nom}
              onChange={(valeur) => modifier('nom', valeur)}
              erreur={erreurs.nom}
            />
            <Champ
              id="email"
              label="E-mail"
              type="email"
              placeholder="alexandre@gmail.com"
              icone="/assets/icons/email.svg"
              valeur={formulaire.email}
              onChange={(valeur) => modifier('email', valeur)}
              erreur={erreurs.email}
            />
            <Champ
              id="telephone"
              label="Téléphone"
              type="tel"
              placeholder="06 00 00 00 00"
              icone="/assets/icons/telephone-champ.svg"
              valeur={formulaire.telephone}
              onChange={(valeur) => modifier('telephone', valeur)}
              erreur={erreurs.telephone}
            />
          </fieldset>

          <div className="demande-devis__envoi">
            {erreurEnvoi && <MessageErreur message={erreurEnvoi} />}
            <Bouton variante="primaire" type="submit" pleineLargeur desactive={envoiEnCours}>
              {envoiEnCours ? 'Envoi…' : 'Envoyer ma demande'}
            </Bouton>
            <p className="demande-devis__texte demande-devis__texte--centre">
              Vos données servent uniquement à traiter votre demande.
            </p>
          </div>
        </form>
      )}

      <Footer />
    </div>
  )
}
