const NoteCard = ({ note, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="note-card">
      <div className="note-header">
        <h3>{note.title}</h3>
        {note.isPinned && <span className="pin-badge">📌 Pinned</span>}
      </div>
      
      <p className="note-content">{note.content}</p>
      
      <div className="note-footer">
        <span className="note-date">{formatDate(note.updatedAt)}</span>
        <div className="note-actions">
          <button onClick={() => onEdit(note)} className="btn-icon" title="Edit">
            ✏️
          </button>
          <button onClick={() => onDelete(note._id)} className="btn-icon" title="Delete">
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
