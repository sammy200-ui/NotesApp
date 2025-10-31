import { useState, useEffect } from 'react';

const NoteForm = ({ noteToEdit, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPinned, setIsPinned] = useState(false);

  // load note data if editing
  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setIsPinned(noteToEdit.isPinned || false);
    } else {
      setTitle('');
      setContent('');
      setIsPinned(false);
    }
  }, [noteToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, isPinned });
    
    // clear form
    if (!noteToEdit) {
      setTitle('');
      setContent('');
      setIsPinned(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <h3>{noteToEdit ? 'Edit Note' : 'Create New Note'}</h3>
      
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          required
        />
      </div>

      <div className="form-group">
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note here..."
          required
          rows="6"
        />
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={isPinned}
            onChange={(e) => setIsPinned(e.target.checked)}
          />
          Pin to top
        </label>
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn btn-primary">
          {noteToEdit ? 'Update' : 'Create'}
        </button>
        {noteToEdit && (
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default NoteForm;
