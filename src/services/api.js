const URL_API = 'http://localhost:3001'

export async function recupererDonnees(ressource) {
  const reponse = await fetch(`${URL_API}/${ressource}`)
  if (reponse.status === 404) {
    throw new Error('introuvable')
  }
  if (!reponse.ok) {
    throw new Error('Erreur lors du chargement des données')
  }
  return reponse.json()
}

export async function envoyerDonnees(ressource, donnees) {
  const reponse = await fetch(`${URL_API}/${ressource}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(donnees),
  })
  if (!reponse.ok) {
    throw new Error('Erreur lors de l’envoi des données')
  }
  return reponse.json()
}
