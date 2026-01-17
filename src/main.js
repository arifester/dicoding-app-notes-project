import notesData from './data/notesData.js';
import './components/app-bar.js';
import './components/note-input.js';
import './components/note-item.js';
import './components/note-list.js';

console.log('Main JS loaded successfully!');

document.addEventListener('DOMContentLoaded', () => {
  const noteListElement = document.querySelector('note-list');
  const noteInputElement = document.querySelector('note-input');

  // Initial render
  noteListElement.notes = notesData;

  // Listen for the custom 'note-added' event from note-input
  noteInputElement.addEventListener('note-added', (event) => {
    const newNote = event.detail;
    
    // Add new note to the beginning of the array
    notesData.unshift(newNote);
    
    // Re-render the list
    noteListElement.notes = notesData;
    
    console.log('New note added:', newNote);
  });
});
