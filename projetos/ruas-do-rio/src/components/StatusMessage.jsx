export default function StatusMessage({ loading, error, resultCount }) {
  if (loading) {
    return <p className="status loading" role="status">Consultando a API pública…</p>
  }

  if (error) {
    return <p className="status error" role="alert">{error}</p>
  }

  if (typeof resultCount === 'number') {
    return (
      <p className="status" role="status">
        {resultCount} {resultCount === 1 ? 'resultado exibido' : 'resultados exibidos'}
      </p>
    )
  }

  return null
}
