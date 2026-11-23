import { useEffect, useRef, useState } from 'react'
import Pagination from './Pagination'
import './Carrousel.css'

const LARGEUR_CARTE = 260
const ESPACE = 16

export default function Carrousel({ children, afficherPagination = true }) {
  const pisteRef = useRef(null)
  const [indexActif, setIndexActif] = useState(0)
  const total = children.length

  useEffect(() => {
    const piste = pisteRef.current

    const gererScroll = () => {
      const index = Math.round(piste.scrollLeft / (LARGEUR_CARTE + ESPACE))
      setIndexActif(Math.min(index, total - 1))
    }

    piste.addEventListener('scroll', gererScroll)
    return () => piste.removeEventListener('scroll', gererScroll)
  }, [total])

  const allerA = (index) => {
    pisteRef.current.scrollTo({ left: index * (LARGEUR_CARTE + ESPACE), behavior: 'smooth' })
  }

  return (
    <div className="carrousel">
      <div className="carrousel__piste" ref={pisteRef}>
        {children}
      </div>
      {afficherPagination && <Pagination total={total} actif={indexActif} onChange={allerA} />}
    </div>
  )
}
