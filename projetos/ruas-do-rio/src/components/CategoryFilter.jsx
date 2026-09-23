export default function CategoryFilter({
  categories,
  value,
  onChange,
  label = 'Filtrar resultados',
}) {
  return (
    <div className="filter-group" aria-label={label}>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={value === category ? 'filter-chip active' : 'filter-chip'}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
