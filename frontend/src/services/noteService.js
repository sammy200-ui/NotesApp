import api from './api';

// Get all notes
export const getNotes = async () => {
  const response = await api.get('/notes');
  return response.data;
};

// Get single note
export const getNoteById = async (id) => {
  const response = await api.get(`/notes/${id}`);
  return response.data;
};

// Create new note
export const createNote = async (noteData) => {
  const response = await api.post('/notes', noteData);
  return response.data;
};

// Update note
export const updateNote = async (id, noteData) => {
  const response = await api.put(`/notes/${id}`, noteData);
  return response.data;
};

// Delete note
export const deleteNote = async (id) => {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
};
