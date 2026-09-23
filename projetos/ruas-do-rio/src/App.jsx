import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import SearchBar from './components/SearchBar.jsx'
import CategoryFilter from './components/CategoryFilter.jsx'
import StreetList from './components/StreetList.jsx'
import StreetDetails from './components/StreetDetails.jsx'
import StatusMessage from './components/StatusMessage.jsx'
import Footer from './components/Footer.jsx'
import { categories, streetOrigins } from './data/streetOrigins.js'
import { searchRioAddresses } from './services/viacep.js'
import { normalizeText } from './utils/text.js'

const FAVORITES_KEY = 'ruas-do-rio:favorites'

function buildLocalStreet(history) {
  return {
    cep: '',
    logradouro: history.name,
    bairro: history.area,
    localidade: 'Rio de Janeiro',
    uf: 'RJ',
    history,
  }
}

function historyFor(name) {
  const normalized = normalizeText(name)
  return streetOrigins.find((item) => normalizeText(item.name) === normalized)
}

function streetKey(street) {
  return street.cep + '|' + street.logradouro + '|' + (street.bairro || '')
}

export default function App() {
  const [query, setQuery] = useState('')
  const [apiResults, setApiResults] = useState([])
  const [hasSearched, setHasSearched] = useState(false)
  const [category, setCategory] = useState('Todos')
  const [selectedStreet, setSelectedStreet] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]')
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  }, [favorites])

  const localStreets = useMemo(
    () => streetOrigins.map(buildLocalStreet),
    [],
  )

  const visibleStreets = useMemo(() => {
    const source = hasSearched ? apiResults : localStreets

    return source.filter((street) => {
      const history = street.history
      const matchesCategory =
        category === 'Todos' || history?.category === category
      const matchesFavorite =
        !onlyFavorites || favorites.includes(streetKey(street))

      return matchesCategory && matchesFavorite
    })
  }, [apiResults, category, favorites, hasSearched, localStreets, onlyFavorites])

  async function handleSearch(event) {
    event.preventDefault()
    const term = query.trim()

    if (term.length < 3) {
      setError('Digite pelo menos 3 caracteres para pesquisar.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const results = await searchRioAddresses(term)
      const enriched = results.map((street) => ({
        ...street,
        history: historyFor(street.logradouro),
      }))

      setApiResults(enriched)
      setHasSearched(true)

      if (!enriched.length) {
        setError('Nenhum logradouro foi encontrado para essa busca.')
      }
    } catch {
      setError(
        'A consulta à API não pôde ser concluída. A base histórica local continua disponível.',
      )
      setApiResults(
        localStreets.filter((street) =>
          normalizeText(street.logradouro).includes(normalizeText(term)),
        ),
      )
      setHasSearched(true)
    } finally {
      setLoading(false)
    }
  }

  function toggleFavorite(street) {
    const key = streetKey(street)
    setFavorites((current) =>
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key],
    )
  }

  function resetExploration() {
    setQuery('')
    setApiResults([])
    setHasSearched(false)
    setError('')
    setCategory('Todos')
    setOnlyFavorites(false)
  }

  return (
    <>
      <Header />

      <main id="inicio">
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <p className="eyebrow">Memória urbana • API pública • React</p>
              <h1>A cidade também conta sua história pelos nomes das ruas.</h1>
              <p className="hero-copy">
                Pesquise logradouros do município do Rio de Janeiro, consulte dados
                de endereço e descubra a origem dos nomes já catalogados na base
                histórica do projeto.
              </p>
            </div>

            <div className="hero-stat">
              <strong>{streetOrigins.length}</strong>
              <span>logradouros com origem histórica catalogada nesta versão</span>
            </div>
          </div>
        </section>

        <section className="explorer">
          <div className="container">
            <SearchBar
              value={query}
              onChange={setQuery}
              onSubmit={handleSearch}
              disabled={loading}
            />

            <div className="toolbar">
              <CategoryFilter
                categories={categories}
                value={category}
                onChange={setCategory}
              />

              <div className="toolbar-actions">
                <button
                  type="button"
                  className={onlyFavorites ? 'secondary-button active' : 'secondary-button'}
                  onClick={() => setOnlyFavorites((value) => !value)}
                >
                  {onlyFavorites ? '★ Favoritos' : '☆ Favoritos'}
                </button>

                {hasSearched && (
                  <button type="button" className="secondary-button" onClick={resetExploration}>
                    Limpar busca
                  </button>
                )}
              </div>
            </div>

            <div className="results-heading">
              <div>
                <p className="section-label">
                  {hasSearched ? 'Resultado da API' : 'Explore a base histórica'}
                </p>
                <h2>
                  {hasSearched
                    ? 'Logradouros encontrados'
                    : 'Alguns nomes que guardam memória'}
                </h2>
              </div>
              <StatusMessage
                loading={loading}
                error={error}
                resultCount={loading ? undefined : visibleStreets.length}
              />
            </div>

            <StreetList
              streets={visibleStreets}
              onOpen={setSelectedStreet}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />

            <aside className="method-note">
              <strong>Como os dados são combinados?</strong>
              <p>
                A API ViaCEP fornece dados de endereço. A explicação histórica não
                vem da API: ela é associada por uma base local de curadoria. Quando
                um logradouro ainda não está catalogado, a aplicação informa isso
                em vez de gerar uma origem automaticamente.
              </p>
            </aside>
          </div>
        </section>
      </main>

      <StreetDetails street={selectedStreet} onClose={() => setSelectedStreet(null)} />
      <Footer />
    </>
  )
}
