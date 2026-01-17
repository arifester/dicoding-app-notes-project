import notesData from './data/notesData.js';
import './components/app-bar.js';
import './components/note-input.js';
import './components/note-item.js';
import './components/note-list.js';

console.log('Main JS loaded successfully!');

document.addEventListener('DOMContentLoaded', () => {
  const noteListElement = document.querySelector('note-list');

  noteListElement.notes = notesData;
});
