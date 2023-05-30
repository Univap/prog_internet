class NavBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.isOpen = false;
  }
  connectedCallback() {
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
    const header = this.shadowRoot.querySelector('.header');
    header.addEventListener('click', () => {
      header.classList.toggle('clicked');
      this.isOpen = !this.isOpen; // alterna o estado da variável entre true e false
      document.getElementsByTagName('a').style.visibility = this.isOpen ? 'visible' : 'hidden'; // altera a visibilidade com base no estado atual da variável
    });    
  }
}

customElements.define('navbar-component', NavBar);
