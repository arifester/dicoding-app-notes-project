class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  // Custom Attributes
  static get observedAttributes() {
    return ['id', 'title', 'body', 'created-at'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  // Helper: Format the date so it's easy to read
  formatDate(dateString) {
    if (!dateString) return '';
    try {
      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      return new Date(dateString).toLocaleDateString('en-US', options);
    } catch (e) {
      return dateString;
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    // Get the value from the attribute or use the default
    const title = this.getAttribute('title') || 'Untitled';
    const body = this.getAttribute('body') || '';
    const dateStr = this.getAttribute('created-at');
    const displayDate = this.formatDate(dateStr);

    this.shadowDOM.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        .note-card {
          background-color: var(--card-bg, #fff);
          /* Consistent Styling with Form */
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          padding: 24px;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(0,0,0,0.03);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        /* Hover Effect (Attractive Appearance) */
        .note-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.1);
          border-color: rgba(0,0,0,0.1);
        }

        .note-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0 0 10px 0;
          color: var(--primary-color, #2c3e50);
          /* Limit long titles with ... if needed */
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2; /* Max 2 lines for title */
          -webkit-box-orient: vertical;
        }

        .note-date {
          font-size: 0.8rem;
          color: #95a5a6;
          margin-bottom: 16px;
          display: block;
          font-weight: 500;
          letter-spacing: 0.5px;
          border-bottom: 1px solid #f0f0f0;
          padding-bottom: 12px;
        }

        .note-body {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #555;
          margin: 0;
          /* Preserve line breaks/newlines from user input */
          white-space: pre-wrap; 
          flex-grow: 1; /* Note content fills the remaining space */
          word-wrap: break-word; /* Prevent long words from breaking layout */
        }
      </style>

      <div class="note-card">
        <h3 class="note-title">${title}</h3>
        <span class="note-date">${displayDate}</span>
        <p class="note-body">${body}</p>
      </div>
    `;
  }
}

customElements.define('note-item', NoteItem);
