import { useState } from 'react';
import AITools from './AITools';

const NoteCard = ({ note, onEdit, onDelete, onUpdate }) => {
  const [showAI, setShowAI] = useState(false);

  // format the date 
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleAIContentUpdate = (newContent) => {
    if (onUpdate) {
      onUpdate(note._id, { ...note, content: newContent });
    }
  };

  return (
    <div className="note-card">
      <div className="note-header">
        <h3>{note.title}</h3>
        {note.isPinned && <span className="pin-badge">Pinned</span>}
      </div>
      
      <p className="note-content">{note.content}</p>
      
      <div className="note-footer">
        <span className="note-date">{formatDate(note.updatedAt)}</span>
        <div className="note-actions">
          <button 
            onClick={() => setShowAI(!showAI)} 
            className="btn-icon btn-ai"
            title="AI Tools"
          >
            AI
          </button>
          <button onClick={() => onEdit(note)} className="btn-icon">
            Edit
          </button>
          <button onClick={() => onDelete(note._id)} className="btn-icon">
            Delete
          </button>
        </div>
      </div>

      {showAI && (
        <AITools 
          note={note} 
          onContentUpdate={handleAIContentUpdate}
        />
      )}
    </div>
  );
};

export default NoteCard;
