import { formatCep } from '../utils/text.js'

export default function StreetCard({
  street,
  onOpen,
  isFavorite,
  onToggleFavorite,
}) {
  const history = street.history

  return (
    <article className="street-card">
      <div className="card-topline">
        <span className="category">
          {history?.category || 'Origem não documentada'}
        </span>
        <button
          className={isFavorite ? 'favorite active' : 'favorite'}
          type="button"
          onClick={() => onToggleFavorite(street)}
          aria-label={
            isFavorite
              ? 'Remover logradouro dos favoritos'
              : 'Adicionar logradouro aos favoritos'
          }
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>

      <h3>{street.logradouro}</h3>
      <p className="place">{street.bairro || history?.area || 'Rio de Janeiro'}</p>
      <p className="origin-preview">
        {history?.origin || 'A origem histórica deste nome ainda não foi catalogada na base local.'}
      </p>

      <div className="card-footer">
        <span>{formatCep(street.cep)}</span>
        <button type="button" onClick={() => onOpen(street)}>
          Ver detalhes
        </button>
      </div>
    </article>
  )
}
