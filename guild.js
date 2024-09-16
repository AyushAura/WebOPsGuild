// Elements
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');
const noteInput = document.getElementById('noteInput');
const notesContainer = document.getElementById('notesContainer');
const editModal = document.getElementById('editModal');
const editNoteInput = document.getElementById('editNoteInput');
const updateBtn = document.getElementById('updateBtn');
const cancelBtn = document.getElementById('cancelBtn');

// Track the index of the note being edited
let editIndex = -1;

// Load saved notes on page load
window.onload = function() {
    loadNotes();
};

// Save note event
saveBtn.addEventListener('click', function() {
    const noteText = noteInput.value.trim();
    if (noteText === '') {
        alert('Please enter a note!');
        return;
    }

    saveNote(noteText);
    noteInput.value = '';  // Clear input field
    loadNotes();  // Reload the notes
});

// Function to save a note
function saveNote(note) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to load and display notes
function loadNotes() {
    notesContainer.innerHTML = '';  // Clear current notes
    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');

        const noteTextDiv = document.createElement('div');
        noteTextDiv.classList.add('note-text');
        noteTextDiv.textContent = note;

        const noteActionsDiv = document.createElement('div');
        noteActionsDiv.classList.add('note-actions');

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.classList.add('action-btn');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', function() {
            editIndex = index;
            editNoteInput.value = note;
            openEditModal();
        });

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('action-btn', 'delete-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function() {
            deleteNote(index);
        });

        noteActionsDiv.appendChild(editBtn);
        noteActionsDiv.appendChild(deleteBtn);

        noteDiv.appendChild(noteTextDiv);
        noteDiv.appendChild(noteActionsDiv);
        notesContainer.appendChild(noteDiv);
    });
}

// Delete a note
function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
}

// Clear all notes
clearBtn.addEventListener('click', function() {
    if (confirm('Are you sure you want to clear all notes?')) {
        localStorage.removeItem('notes');
        loadNotes();
    }
});

// Edit Modal Control
function openEditModal() {
    editModal.style.display = 'flex';
}

function closeEditModal() {
    editModal.style.display = 'none';
}

// Update a note
updateBtn.addEventListener('click', function() {
    const updatedNote = editNoteInput.value.trim();
    if (updatedNote === '') {
        alert('Please enter a note!');
        return;
    }

    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes[editIndex] = updatedNote;
    localStorage.setItem('notes', JSON.stringify(notes));

    closeEditModal();
    loadNotes();
});

// Cancel editing
cancelBtn.addEventListener('click', function() {
    closeEditModal();
});
