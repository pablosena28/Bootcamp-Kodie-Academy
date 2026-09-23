import { formatCep } from '../utils/text.js'

export default function StreetDetails({ street, onClose }) {
  if (!street) return null

  const history = street.history
  const mapQuery = encodeURIComponent(
    [street.logradouro, street.bairro, 'Rio de Janeiro', 'RJ']
      .filter(Boolean)
      .join(', '),
  )

  return (
    <div className="details-backdrop" role="presentation" onMouseDown={onClose}>
      <aside
        className="details-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="details-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="close-button" type="button" onClick={onClose} aria-label="Fechar detalhes">
          ×
        </button>

        <p className="details-kicker">{history?.category || 'Origem não documentada'}</p>
        <h2 id="details-title">{street.logradouro}</h2>
        <p className="details-place">
          {street.bairro || history?.area || 'Rio de Janeiro'} • {formatCep(street.cep)}
        </p>

        <section>
          <h3>Origem do nome</h3>
          <p>
            {history?.origin ||
              'A origem histórica deste logradouro ainda não foi catalogada na base local do projeto.'}
          </p>
        </section>

        {history?.previousName && (
          <section>
            <h3>Nome anterior</h3>
            <p>{history.previousName}</p>
          </section>
        )}

        <section>
          <h3>Dados da API</h3>
          <dl>
            <div>
              <dt>Logradouro</dt>
              <dd>{street.logradouro}</dd>
            </div>
            <div>
              <dt>Bairro</dt>
              <dd>{street.bairro || 'Não informado'}</dd>
            </div>
            <div>
              <dt>CEP</dt>
              <dd>{formatCep(street.cep)}</dd>
            </div>
            <div>
              <dt>Cidade</dt>
              <dd>{street.localidade || 'Rio de Janeiro'} / {street.uf || 'RJ'}</dd>
            </div>
          </dl>
        </section>

        {history?.sourceNote && <p className="source-note">{history.sourceNote}</p>}

        <a
          className="map-link"
          href={'https://www.openstreetmap.org/search?query=' + mapQuery}
          target="_blank"
          rel="noreferrer"
        >
          Procurar no OpenStreetMap
        </a>
      </aside>
    </div>
  )
}
