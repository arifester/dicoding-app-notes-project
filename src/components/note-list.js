class NoteList extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  set notes(notes) {
    this._notes = notes;
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          margin-top: 32px;
        }

        /* SECTION TITLE STYLE */
        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-color, #2c3e50);
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        /* Decorative line next to the title */
        .section-title::after {
          content: '';
          flex-grow: 1;
          height: 1px;
          background-color: #e0e0e0; 
        }

        /* GRID LAYOUT */
        .notes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem; 
        }

        /* ANIMATION */
        .notes-grid note-item {
          animation: fade-in 0.6s ease-out;
        }

        /* Animation Keyframes */
        @keyframes fade-in {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        /* Empty State Style */
        .empty-message {
          text-align: center;
          color: var(--text-muted, #7f8c8d);
          font-style: italic;
          margin-top: 32px;
        }
      </style>
      
      <h2 class="section-title">Your Notes</h2>

      <div class="notes-grid">
        </div>
    `;

    const notesContainer = this.shadowDOM.querySelector('.notes-grid');

    // Handle Empty Data
    if (!this._notes || this._notes.length === 0) {
      notesContainer.innerHTML = '';
      this.shadowDOM.innerHTML += '<p class="empty-message">No notes available. Create one above!</p>';
      return;
    }

    // Render Items
    this._notes.forEach(note => {
      const noteItemElement = document.createElement('note-item');
      
      // Pass data via attributes (Custom Attributes)
      noteItemElement.setAttribute('id', note.id);
      noteItemElement.setAttribute('title', note.title);
      noteItemElement.setAttribute('body', note.body);
      noteItemElement.setAttribute('created-at', note.createdAt);
      
      notesContainer.appendChild(noteItemElement);
    });
  }
}

customElements.define('note-list', NoteList);
