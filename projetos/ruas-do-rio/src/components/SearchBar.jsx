export default function SearchBar({
  value,
  onChange,
  onSubmit,
  disabled,
}) {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <label htmlFor="street-search">Pesquise um logradouro do Rio de Janeiro</label>
      <div className="search-row">
        <input
          id="street-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Ex.: Avenida Rio Branco"
          autoComplete="off"
        />
        <button type="submit" disabled={disabled}>
          Buscar
        </button>
      </div>
      <small>Digite pelo menos 3 caracteres. A consulta utiliza a API pública ViaCEP.</small>
    </form>
  )
}
