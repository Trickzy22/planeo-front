import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import LienRetour from '../../components/LienRetour/LienRetour'
import Carrousel from '../../components/Carrousel/Carrousel'
import Badge from '../../components/Badge/Badge'
import PrixDetaille from '../../components/PrixDetaille/PrixDetaille'
import CarteRealisation from '../../components/CarteRealisation/CarteRealisation'
import Interlocuteur from '../../components/Interlocuteur/Interlocuteur'
import Bouton from '../../components/Bouton/Bouton'
import Chargement from '../../components/Chargement/Chargement'
import MessageErreur from '../../components/MessageErreur/MessageErreur'
import { useRecherche } from '../../context/RechercheContext'
import { recupererDonnees } from '../../services/api'
import './FicheSalle.css'

function formaterPrix(montant) {
  return `${montant.toLocaleString('fr-FR').replace(/\s/g, ' ')} €`
}

export default function FicheSalle() {
  const { id } = useParams()
  const { criteres } = useRecherche()
  const [salle, setSalle] = useState(null)
  const [interlocuteur, setInterlocuteur] = useState(null)
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState('')

  useEffect(() => {
    Promise.all([recupererDonnees(`salles/${id}`), recupererDonnees('interlocuteurs/1')])
      .then(([donneesSalle, donneesInterlocuteur]) => {
        setSalle(donneesSalle)
        setInterlocuteur(donneesInterlocuteur)
        document.title = `${donneesSalle.nom} · Planeo`
      })
      .catch((erreur) =>
        setErreur(
          erreur.message === 'introuvable'
            ? 'Ce lieu n’existe pas.'
            : 'Impossible de charger ce lieu. Vérifiez que l’API est lancée.'
        )
      )
      .finally(() => setChargement(false))
  }, [id])

  const date = criteres.date.split('-').reverse().join('/')

  return (
    <div className="page fiche-salle">
      <Header />

      {chargement && <Chargement />}

      {erreur && (
        <div className="conteneur fiche-salle__erreur">
          <MessageErreur message={erreur} avecReessayer />
        </div>
      )}

      {!chargement && !erreur && (
        <>
          <main className="fiche-salle__contenu">
            <div className="conteneur">
              <LienRetour libelle="Retour aux résultats" />
            </div>

            <Carrousel largeurCarte={340}>
              {salle.photos.map((photo, index) => (
                <img key={photo} className="fiche-salle__photo" src={photo} alt={`${salle.nom}, photo ${index + 1}`} />
              ))}
            </Carrousel>

            <section className="conteneur fiche-salle__infos">
              <div className="fiche-salle__badges">
                {salle.type === 'planeo' ? (
                  <Badge libelle="Salle Planeo" couleur="bleu" icone="/assets/icons/etincelle.svg" />
                ) : (
                  <Badge libelle="Partenaire" couleur="orange" />
                )}
                {date && <Badge libelle={`Dispo le ${date}`} couleur="vert" icone="/assets/icons/check-dispo.svg" />}
              </div>
              <h1 className="fiche-salle__nom">{salle.nom}</h1>
              <p className="fiche-salle__texte">
                {salle.lieu} · {salle.description}
              </p>
              <div className="fiche-salle__capacites">
                <div className="fiche-salle__capacite fiche-salle__capacite--bleu">
                  <p className="fiche-salle__capacite-valeur">{salle.capacites.assis}</p>
                  <p className="fiche-salle__texte">assis</p>
                </div>
                <div className="fiche-salle__capacite fiche-salle__capacite--jaune">
                  <p className="fiche-salle__capacite-valeur">{salle.capacites.cocktail}</p>
                  <p className="fiche-salle__texte">cocktail</p>
                </div>
                <div className="fiche-salle__capacite fiche-salle__capacite--vert">
                  <p className="fiche-salle__capacite-valeur">{salle.capacites.surface} m²</p>
                  <p className="fiche-salle__texte">surface</p>
                </div>
              </div>
            </section>

            <section className="conteneur">
              <PrixDetaille lignes={salle.lignesPrix} total={salle.prix} />
            </section>

            <section className="conteneur fiche-salle__section">
              <h2 className="fiche-salle__titre">Équipements et services</h2>
              <div className="fiche-salle__badges">
                {salle.equipements.map((equipement) => (
                  <Badge key={equipement} libelle={equipement} couleur="jaune" />
                ))}
              </div>
            </section>

            {salle.evenements.length > 0 && (
              <section className="fiche-salle__evenements">
                <h2 className="conteneur fiche-salle__titre">Événements passés ici</h2>
                <Carrousel afficherPagination={false}>
                  {salle.evenements.map((evenement) => (
                    <CarteRealisation
                      key={evenement.id}
                      categorie={evenement.categorie}
                      titre={evenement.titre}
                      infos={evenement.infos}
                      image={evenement.image}
                      video={evenement.video}
                    />
                  ))}
                </Carrousel>
              </section>
            )}

            <section className="conteneur">
              <Interlocuteur initiales={interlocuteur.initiales} nom={interlocuteur.nom} role={interlocuteur.role} />
            </section>

            <section className="conteneur fiche-salle__section">
              <h2 className="fiche-salle__titre">Localisation</h2>
              {salle.plan && <img className="fiche-salle__plan" src={salle.plan} alt={`Plan d’accès à ${salle.nom}`} />}
              <p className="fiche-salle__texte">{salle.adresse}</p>
            </section>
          </main>

          <div className="fiche-salle__barre">
            <div>
              <p className="fiche-salle__texte">Prix estimé</p>
              <p className="fiche-salle__prix">{formaterPrix(salle.prix)}</p>
            </div>
            <Bouton variante="primaire" to={`/salles/${salle.id}/devis`}>
              Demander un devis
            </Bouton>
          </div>
        </>
      )}

      <Footer />
    </div>
  )
}
