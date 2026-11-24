import './Interlocuteur.css'

export default function Interlocuteur({ initiales, nom, role }) {
  return (
    <section className="interlocuteur">
      <p className="surtitre interlocuteur__surtitre">Votre interlocuteur unique</p>
      <div className="interlocuteur__identite">
        <span className="interlocuteur__avatar">{initiales}</span>
        <div>
          <p className="interlocuteur__nom">{nom}</p>
          <p className="interlocuteur__role">{role}</p>
        </div>
      </div>
      <div className="interlocuteur__actions">
        <button type="button" className="interlocuteur__action">
          <img src="/assets/icons/telephone.svg" alt="" width="18" height="18" />
          Appeler
        </button>
        <button type="button" className="interlocuteur__action">
          <img src="/assets/icons/email.svg" alt="" width="18" height="18" />
          E-mail
        </button>
      </div>
    </section>
  )
}
