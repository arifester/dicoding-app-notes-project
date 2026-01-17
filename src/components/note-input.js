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

    // Realtime Validation for Title
    titleInput.addEventListener('input', () => {
      this.validateTitle(titleInput);
    });

    // Realtime Validation for Body
    bodyInput.addEventListener('input', () => {
      this.validateBody(bodyInput);
    });

    // Handle Submit
    form.addEventListener('submit', (event) => {
      this.handleSubmit(event, titleInput, bodyInput);
    });
  }

  validateTitle(input) {
    const errorElement = this.shadowDOM.querySelector('#title-error');
    
    // Validation logic: Title must be at least 6 characters
    if (input.value.length < 6) {
      errorElement.innerText = 'Title must be at least 6 characters long.';
      input.classList.add('invalid');
      this.checkFormValidity(); // Check if button should be disabled
      return false;
    } else {
      errorElement.innerText = '';
      input.classList.remove('invalid');
      this.checkFormValidity();
      return true;
    }
  }

  validateBody(input) {
    const errorElement = this.shadowDOM.querySelector('#body-error');

    // Validation logic: Body must be at least 10 characters
    if (input.value.length < 10) {
      errorElement.innerText = 'Description must be at least 10 characters long.';
      input.classList.add('invalid');
      this.checkFormValidity();
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

    // Enable button onlly if both inputs are valid
    if (titleInput.value.length >= 6 && bodyInput.value.length >= 10) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  }

  handleSubmit(event, titleInput, bodyInput) {
    event.preventDefault();

    // Final validation check before submitting
    if (titleInput.value.length < 6 || bodyInput.value.length < 10) return;

    // Create new note object
    const newNote = {
      id: `notes-${Math.random().toString(36).substring(2, 9)}`,
      title: titleInput.value,
      body: bodyInput.value,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    // Dispatch custom event to main.js
    this.dispatchEvent(new CustomEvent('note-added', {
      detail: newNote,
      bubbles: true,
      composed: true
    }));

    // Reset Form
    titleInput.value = '';
    bodyInput.value = '';
    
    // Reset validation state
    this.checkFormValidity(); 
  }

  render() {
    this.shadowDOM.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          margin-bottom: 3rem;
        }

        .wrapper {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .form-container {
          background-color: var(--card-bg, #fff);
          padding: 32px;
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          
          width: 100%;
          max-width: 600px;
          
          border: 1px solid rgba(0,0,0,0.05);
          box-sizing: border-box;
        }

        h2 {
          margin-top: 0;
          margin-bottom: 24px;
          color: var(--primary-color, #2c3e50);
          text-align: center;
          font-weight: 700;
        }

        .form-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: var(--primary-color, #2c3e50);
          font-size: 0.95rem;
        }

        input, textarea {
          width: 100%;
          padding: 14px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-family: inherit;
          font-size: 1rem;
          background-color: #f9f9f9;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        input:focus, textarea:focus {
          outline: none;
          border-color: var(--accent-color, #3498db);
          background-color: #fff;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.15);
        }

        input.invalid, textarea.invalid {
          border-color: var(--secondary-color, #e74c3c);
          background-color: #fff5f5;
        }

        .error-message {
          color: var(--secondary-color, #e74c3c);
          font-size: 0.85rem;
          margin-top: 6px;
          display: block;
          min-height: 20px;
        }

        button {
          width: 100%;
          padding: 14px;
          background-color: var(--primary-color, #2c3e50);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
          margin-top: 8px;
        }

        button:hover {
          background-color: #34495e;
        }

        button:disabled {
          background-color: #bdc3c7;
          cursor: not-allowed;
        }
      </style>

      <div class="wrapper">
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
              <textarea id="body" rows="5" placeholder="Enter description (min. 10 chars)"></textarea>
              <span class="error-message" id="body-error"></span>
            </div>

            <button type="submit" id="submit-btn" disabled>Add Note</button>
          </form>
        </div>
      </div>
    `;
  }
}

customElements.define('note-input', NoteInput);
