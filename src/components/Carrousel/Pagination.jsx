import './Carrousel.css'

export default function Pagination({ total, actif, onChange }) {
  return (
    <div className="pagination">
      {Array.from({ length: total }, (_, index) => (
        <button
          key={index}
          type="button"
          className={`pagination__point ${index === actif ? 'pagination__point--actif' : ''}`}
          onClick={() => onChange(index)}
          aria-label={`Aller à l’élément ${index + 1}`}
        />
      ))}
    </div>
  )
}
