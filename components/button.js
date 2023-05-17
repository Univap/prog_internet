class Button extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }
  connectedCallback() {
    const text = this.getAttribute('text');
    const func = this.getAttribute('function');
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="components\\styles.css">
      <button onclick="${func}" class="button-component" style="width:100%">${text}</button>
    `;    
  }
}

customElements.define('button-component', Button);
