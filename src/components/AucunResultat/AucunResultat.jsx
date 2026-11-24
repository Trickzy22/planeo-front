import Bouton from '../Bouton/Bouton'
import Onglet from '../Onglet/Onglet'
import './AucunResultat.css'

// datesProches : [{ valeur: '2027-06-05', libelle: '05/06' }, ...]
export default function AucunResultat({ date, datesProches = [], onChoisirDate }) {
  return (
    <section className="aucun-resultat">
      <div className="aucun-resultat__illustration">
        <span className="aucun-resultat__pastille">
          <img src="/assets/icons/recherche-vide.svg" alt="" width="28" height="28" />
        </span>
      </div>
      <h1 className="aucun-resultat__titre">Aucun lieu libre{date && ` le ${date}`}</h1>
      <p className="aucun-resultat__texte">
        Pas de panique : un chargé de projet cherche pour vous, y compris hors catalogue.
      </p>
      <Bouton variante="primaire" to="/contact" icone="/assets/icons/etincelle-bouton.svg" pleineLargeur>
        Recherche sur mesure
      </Bouton>
      <Bouton variante="texte" to="/recherche">
        Modifier mes critères
      </Bouton>

      {datesProches.length > 0 && (
        <>
          <p className="surtitre aucun-resultat__surtitre">Dates proches disponibles</p>
          <div className="aucun-resultat__dates">
            {datesProches.map((dateProche) => (
              <Onglet key={dateProche.valeur} libelle={dateProche.libelle} onClick={() => onChoisirDate(dateProche.valeur)} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
