class NoteInput extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  setupEventListeners() {
    const form = this.shadowDOM.querySelector('form');
    const titleInput = this.shadowDOM.querySelector('#title');
    const bodyInput = this.shadowDOM.querySelector('#body');

    // Listening to 'input' event, NOT 'change' or 'blur'
    titleInput.addEventListener('input', () => {
      this.validateTitle(titleInput);
    });

    bodyInput.addEventListener('input', () => {
      this.validateBody(bodyInput);
    });

    form.addEventListener('submit', (event) => {
      this.handleSubmit(event, titleInput, bodyInput);
    });
  }

  validateTitle(input) {
    const errorElement = this.shadowDOM.querySelector('#title-error');
    const submitBtn = this.shadowDOM.querySelector('#submit-btn');

    if (input.value.length < 6) {
      errorElement.innerText = 'Title must be at least 6 characters long.';
      input.classList.add('invalid');
      submitBtn.disabled = true; // Disable button immediately
      return false;
    } else {
      errorElement.innerText = '';
      input.classList.remove('invalid');
      this.checkFormValidity(); // Check if we can enable the button
      return true;
    }
  }

  validateBody(input) {
    const errorElement = this.shadowDOM.querySelector('#body-error');
    const submitBtn = this.shadowDOM.querySelector('#submit-btn');

    if (input.value.length < 10) {
      errorElement.innerText = 'Description must be at least 10 characters long.';
      input.classList.add('invalid');
      submitBtn.disabled = true;
      return false;
    } else {
      errorElement.innerText = '';
      input.classList.remove('invalid');
      this.checkFormValidity();
      return true;
    }
  }

  checkFormValidity() {
    const titleInput = this.shadowDOM.querySelector('#title');
    const bodyInput = this.shadowDOM.querySelector('#body');
    const submitBtn = this.shadowDOM.querySelector('#submit-btn');

    // Enable button only if both inputs are valid
    if (titleInput.value.length >= 6 && bodyInput.value.length >= 10) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  }

  handleSubmit(event, titleInput, bodyInput) {
    event.preventDefault();

    // Double check validation before processing
    if (titleInput.value.length < 6 || bodyInput.value.length < 10) return;

    const newNote = {
      id: `notes-${Math.random().toString(36).substring(2, 9)}`,
      title: titleInput.value,
      body: bodyInput.value,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    // Dispatch Custom Event so main.js can handle the data update
    // bubbling: true allows the event to reach the document
    this.dispatchEvent(new CustomEvent('note-added', {
      detail: newNote,
      bubbles: true, 
      composed: true
    }));

    // Reset form
    titleInput.value = '';
    bodyInput.value = '';
    // Reset button state
    this.shadowDOM.querySelector('#submit-btn').disabled = true;
  }

  render() {
    this.shadowDOM.innerHTML = `
      <style>
        :host {
          display: block;
          margin-bottom: 32px;
        }

        .form-container {
          background-color: var(--card-bg, #fff);
          padding: 24px;
          border-radius: var(--radius, 8px);
          box-shadow: var(--shadow, 0 4px 6px rgba(0,0,0,0.1));
          max-width: 600px;
          margin: 0 auto;
        }

        h2 {
          margin-top: 0;
          margin-bottom: 20px;
          color: var(--primary-color, #2c3e50);
          text-align: center;
        }

        .form-group {
          margin-bottom: 16px;
        }

        label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: var(--primary-color, #2c3e50);
        }

        input, textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-family: inherit;
          font-size: 1rem;
          transition: border-color 0.2s;
        }

        /* Focus Style */
        input:focus, textarea:focus {
          outline: none;
          border-color: var(--accent-color, #3498db);
          box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
        }

        /* Invalid Style */
        input.invalid, textarea.invalid {
          border-color: var(--secondary-color, #e74c3c);
        }

        .error-message {
          color: var(--secondary-color, #e74c3c);
          font-size: 0.85rem;
          margin-top: 4px;
          display: block;
          min-height: 20px; /* Prevent layout shift */
        }

        button {
          width: 100%;
          padding: 12px;
          background-color: var(--primary-color, #2c3e50);
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        button:hover {
          background-color: #34495e;
        }

        button:disabled {
          background-color: #95a5a6;
          cursor: not-allowed;
        }
      </style>

      <div class="form-container">
        <h2>Add New Note</h2>
        <form id="note-form">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" id="title" placeholder="Enter title (min. 6 chars)" autocomplete="off">
            <span class="error-message" id="title-error"></span>
          </div>

          <div class="form-group">
            <label for="body">Description</label>
            <textarea id="body" rows="4" placeholder="Enter description (min. 10 chars)"></textarea>
            <span class="error-message" id="body-error"></span>
          </div>

          <button type="submit" id="submit-btn" disabled>Add Note</button>
        </form>
      </div>
    `;
  }
}

customElements.define('note-input', NoteInput);
