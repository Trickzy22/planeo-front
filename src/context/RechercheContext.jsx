import { createContext, useContext, useState } from 'react'

const criteresParDefaut = {
  typeEvenement: 'Mariage',
  date: '',
  invites: '',
  budget: '',
}

const RechercheContext = createContext(null)

export function RechercheProvider({ children }) {
  const [criteres, setCriteres] = useState(criteresParDefaut)

  const modifierCritere = (nom, valeur) => {
    setCriteres((precedents) => ({ ...precedents, [nom]: valeur }))
  }

  const reinitialiser = () => setCriteres(criteresParDefaut)

  return (
    <RechercheContext.Provider value={{ criteres, modifierCritere, reinitialiser }}>
      {children}
    </RechercheContext.Provider>
  )
}

export function useRecherche() {
  return useContext(RechercheContext)
}
