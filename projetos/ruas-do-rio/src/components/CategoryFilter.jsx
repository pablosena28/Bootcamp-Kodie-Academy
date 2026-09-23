export default function CategoryFilter({ categories, value, onChange }) {
  return (
    <div className="filter-group" aria-label="Filtrar por origem do nome">
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
