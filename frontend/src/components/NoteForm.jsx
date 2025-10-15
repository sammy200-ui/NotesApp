import { useState, useEffect } from 'react';

const NoteForm = ({ noteToEdit, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    isPinned: false,
  });

  useEffect(() => {
    if (noteToEdit) {
      setFormData({
        title: noteToEdit.title,
        content: noteToEdit.content,
        isPinned: noteToEdit.isPinned || false,
      });
    }
  }, [noteToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: '', content: '', isPinned: false });
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <h3>{noteToEdit ? 'Edit Note' : 'Create New Note'}</h3>
      
      <div className="form-group">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Note title"
          required
          maxLength="100"
        />
      </div>

      <div className="form-group">
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Note content"
          required
          rows="6"
          maxLength="5000"
        />
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="isPinned"
            checked={formData.isPinned}
            onChange={handleChange}
          />
          Pin this note
        </label>
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn btn-primary">
          {noteToEdit ? 'Update Note' : 'Create Note'}
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
