import './Champ.css'

export default function Champ({ id, label, icone, valeur, onChange, type = 'text', placeholder, valide = false, erreur }) {
  const rempli = valeur !== ''

  let classeZone = 'champ__zone'
  if (rempli && valide) classeZone += ' champ__zone--valide'
  if (erreur) classeZone += ' champ__zone--erreur'

  return (
    <div className="champ">
      <label htmlFor={id} className="champ__label">
        {label}
      </label>
      <div className={classeZone}>
        {icone && <img src={icone} alt="" width="20" height="20" />}
        <input
          id={id}
          className="champ__input"
          type={type}
          value={valeur}
          placeholder={placeholder}
          aria-invalid={erreur ? true : false}
          onChange={(event) => onChange(event.target.value)}
        />
        {rempli && valide && <img src="/assets/icons/check.svg" alt="" width="18" height="18" />}
      </div>
      {erreur && <p className="champ__erreur">{erreur}</p>}
    </div>
  )
}
