export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#inicio" aria-label="Ruas do Rio — início">
          <span className="brand-mark" aria-hidden="true">R</span>
          <span>Ruas do Rio</span>
        </a>
        <a className="header-link" href="#sobre">Sobre o projeto</a>
      </div>
    </header>
  )
}
