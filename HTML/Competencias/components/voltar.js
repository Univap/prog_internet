class Voltar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="components\\styles.css">
      <div class="voltar-component">
        <a href="http://localhost:8080/" class="voltar-component-tag">Voltar aaa</a>
      </div>
    `;
  }
}

customElements.define('voltar-component', Voltar);