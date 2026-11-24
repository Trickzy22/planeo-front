import { useEffect, useRef, useState } from 'react'
import Pagination from './Pagination'
import './Carrousel.css'

const ESPACE = 16

export default function Carrousel({ children, afficherPagination = true, largeurCarte = 260 }) {
  const pisteRef = useRef(null)
  const [indexActif, setIndexActif] = useState(0)
  const total = children.length

  useEffect(() => {
    const piste = pisteRef.current

    const gererScroll = () => {
      const index = Math.round(piste.scrollLeft / (largeurCarte + ESPACE))
      setIndexActif(Math.min(index, total - 1))
    }

    piste.addEventListener('scroll', gererScroll)
    return () => piste.removeEventListener('scroll', gererScroll)
  }, [total, largeurCarte])

  const allerA = (index) => {
    pisteRef.current.scrollTo({ left: index * (largeurCarte + ESPACE), behavior: 'smooth' })
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
