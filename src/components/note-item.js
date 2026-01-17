class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['id', 'title', 'body', 'created-at'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  // Helper to format date nicely (e.g., "Saturday, October 10, 2025")
  formatDate(dateString) {
    if (!dateString) return '';
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute('title') || 'Untitled';
    const body = this.getAttribute('body') || '';
    const dateStr = this.getAttribute('created-at');
    const displayDate = this.formatDate(dateStr);

    this.shadowDOM.innerHTML = `
      <style>
        :host {
          display: block;
          height: 100%; /* Important for Grid equal heights */
        }
        
        .note-card {
          background-color: var(--card-bg, #fff);
          border-radius: var(--radius, 8px);
          box-shadow: var(--shadow, 0 2px 4px rgba(0,0,0,0.1));
          padding: 20px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }

        /* Hover effect for "Attractive Design" */
        .note-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-hover, 0 8px 16px rgba(0,0,0,0.2));
        }

        .note-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 10px;
          color: var(--primary-color, #2c3e50);
        }

        .note-date {
          font-size: 0.85rem;
          color: var(--text-muted, #aaa);
          margin-bottom: 12px;
          display: block;
        }

        .note-body {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--text-color, #333);
          white-space: pre-wrap; /* Preserves line breaks */
          flex-grow: 1;
        }
      </style>

      <div class="note-card">
        <div>
          <h3 class="note-title">${title}</h3>
          <span class="note-date">${displayDate}</span>
          <p class="note-body">${body}</p>
        </div>
      </div>
    `;
  }
}

customElements.define('note-item', NoteItem);
