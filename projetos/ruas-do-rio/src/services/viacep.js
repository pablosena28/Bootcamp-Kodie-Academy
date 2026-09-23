const BASE_URL = 'https://viacep.com.br/ws'

export async function searchRioAddresses(query, signal) {
  const term = query.trim()

  if (term.length < 3) {
    return []
  }

  const url =
    BASE_URL +
    '/RJ/Rio%20de%20Janeiro/' +
    encodeURIComponent(term) +
    '/json/'

  const response = await fetch(url, { signal })

  if (!response.ok) {
    throw new Error('Não foi possível consultar a API de endereços.')
  }

  const data = await response.json()

  if (!Array.isArray(data)) {
    return []
  }

  return data.filter(
    (item) => item.localidade === 'Rio de Janeiro' && item.uf === 'RJ',
  )
}
