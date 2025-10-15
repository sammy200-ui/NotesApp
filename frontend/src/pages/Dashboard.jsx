import { useState, useEffect } from 'react';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';
import { getNotes, createNote, updateNote, deleteNote } from '../services/noteService';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const data = await getNotes();
      setNotes(data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (noteData) => {
    try {
      const newNote = await createNote(noteData);
      setNotes([newNote, ...notes]);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create note');
    }
  };

  const handleUpdateNote = async (noteData) => {
    try {
      const updated = await updateNote(noteToEdit._id, noteData);
      setNotes(notes.map((note) => (note._id === updated._id ? updated : note)));
      setNoteToEdit(null);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update note');
    }
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(id);
        setNotes(notes.filter((note) => note._id !== id));
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete note');
      }
    }
  };

  const handleEditClick = (note) => {
    setNoteToEdit(note);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setNoteToEdit(null);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>My Notes</h1>

        {error && <div className="error-message">{error}</div>}

        <div className="note-form-container">
          <NoteForm
            noteToEdit={noteToEdit}
            onSubmit={noteToEdit ? handleUpdateNote : handleCreateNote}
            onCancel={handleCancelEdit}
          />
        </div>

        <div className="notes-section">
          <h2>All Notes ({notes.length})</h2>
          
          {loading ? (
            <p>Loading notes...</p>
          ) : notes.length === 0 ? (
            <p className="no-notes">No notes yet. Create your first note above!</p>
          ) : (
            <div className="notes-grid">
              {notes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteNote}
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
