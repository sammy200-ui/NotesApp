import { useState, useEffect } from 'react';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { getNotes, createNote, updateNote, deleteNote } from '../services/noteService';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setLoading(true);
      const data = await getNotes();
      setNotes(data);
    } catch (err) {
      setError('Failed to load notes');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (noteData) => {
    try {
      const newNote = await createNote(noteData);
      setNotes([newNote, ...notes]);
    } catch (err) {
      setError('Could not create note');
    }
  };

  const handleUpdate = async (noteData) => {
    try {
      const updated = await updateNote(editingNote._id, noteData);
      setNotes(notes.map(note => 
        note._id === updated._id ? updated : note
      ));
      setEditingNote(null);
    } catch (err) {
      setError('Failed to update note');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this note?')) {
      try {
        await deleteNote(id);
        setNotes(notes.filter(note => note._id !== id));
      } catch (err) {
        setError('Could not delete note');
      }
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    window.scrollTo(0, 0);
  };

  const cancelEdit = () => {
    setEditingNote(null);
  };

  // sort pinned notes first
  const sortedNotes = [...notes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>My Notes</h1>

        {error && <div className="error-message">{error}</div>}

        <div className="note-form-container">
          <NoteForm
            noteToEdit={editingNote}
            onSubmit={editingNote ? handleUpdate : handleCreate}
            onCancel={cancelEdit}
          />
        </div>

        <div className="notes-section">
          <h2>All Notes ({notes.length})</h2>
          
          {loading ? (
            <LoadingSpinner message="Loading notes..." />
          ) : notes.length === 0 ? (
            <p className="no-notes">No notes yet. Create one above!</p>
          ) : (
            <div className="notes-grid">
              {sortedNotes.map(note => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
