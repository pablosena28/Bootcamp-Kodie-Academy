import StreetCard from './StreetCard.jsx'

export default function StreetList({
  streets,
  onOpen,
  favorites,
  onToggleFavorite,
}) {
  if (!streets.length) {
    return (
      <div className="empty-state">
        <strong>Nenhum logradouro encontrado.</strong>
        <p>Tente outro termo ou altere o filtro selecionado.</p>
      </div>
    )
  }

  return (
    <div className="street-grid">
      {streets.map((street) => {
        const key = street.cep + '|' + street.logradouro + '|' + (street.bairro || '')
        return (
          <StreetCard
            key={key}
            street={street}
            onOpen={onOpen}
            isFavorite={favorites.includes(key)}
            onToggleFavorite={onToggleFavorite}
          />
        )
      })}
    </div>
  )
}
