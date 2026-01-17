class AppBar extends HTMLElement {
  constructor() {
    super();
    // Enable Shadow DOM for style isolation
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          color: #ffffff;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        div {
          padding: 16px 20px;
          background-color: var(--primary-color, #2c3e50);
        }
        
        h1 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 600;
          text-align: center;
          letter-spacing: 1px;
        }
      </style>
      
      <div>
        <h1>Notes App</h1>
      </div>
    `;
  }
}

customElements.define('app-bar', AppBar);
