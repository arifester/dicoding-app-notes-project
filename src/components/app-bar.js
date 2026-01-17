class AppBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  // Define observed attributes
  static get observedAttributes() {
    return ['title'];
  }

  // React to attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'title' && oldValue !== newValue) {
      // Re-render only if title changes
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    // Get title from attribute or set a default fallback
    const title = this.getAttribute('title') || 'Notes App';

    this.shadowDOM.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          color: #ffffff;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem; /* Add margin to separate from content */
        }
        
        div {
          padding: 24px 20px;
          background-color: var(--primary-color, #2c3e50);
        }
        
        h1 {
          margin: 0;
          font-size: 1.8rem;
          font-weight: 600;
          text-align: center;
          letter-spacing: 1px;
          /* Optional: Add text shadow for better contrast */
          text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      </style>
      
      <div>
        <h1>${title}</h1>
      </div>
    `;
  }
}

customElements.define('app-bar', AppBar);
