import './CaseACocher.css'

export default function CaseACocher({ libelle, coche, onChange }) {
  return (
    <label className="case-a-cocher">
      <input type="checkbox" checked={coche} onChange={onChange} />
      <span className="case-a-cocher__case">
        {coche && <img src="/assets/icons/coche-blanche.svg" alt="" width="16" height="16" />}
      </span>
      {libelle}
    </label>
  )
}
