import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Bouton from '../../components/Bouton/Bouton'
import LigneDePrix from '../../components/LigneDePrix/LigneDePrix'
import Interlocuteur from '../../components/Interlocuteur/Interlocuteur'
import Alerte from '../../components/Alerte/Alerte'
import Chargement from '../../components/Chargement/Chargement'
import MessageErreur from '../../components/MessageErreur/MessageErreur'
import { recupererDonnees } from '../../services/api'
import './Confirmation.css'

export default function Confirmation() {
  const { id = '1' } = useParams()
  const [demande, setDemande] = useState(null)
  const [interlocuteur, setInterlocuteur] = useState(null)
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState('')

  useEffect(() => {
    document.title = 'Planeo · Demande envoyée'

    Promise.all([recupererDonnees(`demandes/${id}`), recupererDonnees('interlocuteurs/1')])
      .then(([donneesDemande, donneesInterlocuteur]) => {
        setDemande(donneesDemande)
        setInterlocuteur(donneesInterlocuteur)
      })
      .catch(() => setErreur('Impossible de charger les données. Vérifiez que l’API est lancée.'))
      .finally(() => setChargement(false))
  }, [id])

  return (
    <div className="page confirmation">
      <Header />

      {chargement && <Chargement />}

      {erreur && (
        <div className="conteneur">
          <MessageErreur message={erreur} avecReessayer />
        </div>
      )}

      {!chargement && !erreur && (
        <main className="confirmation__contenu">
          <section className="confirmation__carte confirmation__etat">
            <div className="confirmation__illustration">
              <span className="confirmation__pastille">
                <img src="/assets/icons/check-grand.svg" alt="" width="30" height="30" />
              </span>
            </div>
            <h1 className="confirmation__titre">Demande envoyée !</h1>
            <p className="confirmation__texte">
              Merci {demande.prenom}, {interlocuteur.prenom} vous répond sous 48 h ouvrées.
            </p>
            <Bouton variante="secondaire" to="/">
              Retour à l’accueil
            </Bouton>
          </section>

          <section className="confirmation__carte confirmation__recapitulatif">
            <h2 className="surtitre confirmation__surtitre">Récapitulatif</h2>
            <LigneDePrix libelle="Lieu" montant={demande.lieu} />
            <LigneDePrix libelle="Événement" montant={demande.evenement} />
            <LigneDePrix libelle="Date" montant={demande.date} />
            <LigneDePrix libelle="Invités" montant={demande.invites} />
            <LigneDePrix libelle="Prestations" montant={demande.prestations} />
            <LigneDePrix total libelle="Budget global" montant={demande.budget} />
            <LigneDePrix total libelle="Prix global estimé" montant={demande.prixEstime} />
          </section>

          <Interlocuteur {...interlocuteur} />
          <Alerte
            titre="Prochaine étape"
            message={`${interlocuteur.prenom} vous appelle sous 48 h ouvrées pour organiser une visite du lieu.`}
          />
        </main>
      )}

      <Footer />
    </div>
  )
}
