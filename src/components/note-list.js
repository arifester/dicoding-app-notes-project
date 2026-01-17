class NoteList extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  // Method to set data from main.js
  set notes(notes) {
    this._notes = notes;
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
      <style>
        :host {
          display: block;
          margin-top: 32px;
        }
        
        .notes-grid {
          display: grid;
          /* Auto-fill creates responsive columns automatically */
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }
      </style>
      
      <div class="notes-grid">
        </div>
    `;

    const notesContainer = this.shadowDOM.querySelector('.notes-grid');

    // Loop through data and create <note-item> elements
    this._notes.forEach(note => {
      const noteItemElement = document.createElement('note-item');
      
      // Setting attributes
      noteItemElement.setAttribute('id', note.id);
      noteItemElement.setAttribute('title', note.title);
      noteItemElement.setAttribute('body', note.body);
      noteItemElement.setAttribute('created-at', note.createdAt);
      
      notesContainer.appendChild(noteItemElement);
    });
  }
}

customElements.define('note-list', NoteList);
