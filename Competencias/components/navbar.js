class NavBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isOpen = false;

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="components\\styles.css">
      <nav>
        <a class="all-competences" href="/index.html">
          Ver competências
        </a>
        <a class="all-competences" href="/setCompetence.html">
          Minhas competências
        </a>
        <a class="criar-competencia" href="/create.html">
          Criar competências
        </a>
        <a class="editar-competencias" href="/edit.html">
          Editar competências
        </a>
      </nav>
    `;
  }
}

customElements.define('navbar-component', NavBar);
