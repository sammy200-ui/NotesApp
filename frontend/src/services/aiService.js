import api from './api';

export const summarizeNote = async (title, content) => {
  const response = await api.post('/ai/summarize', { title, content });
  return response.data.result;
};

export const expandNote = async (title, content) => {
  const response = await api.post('/ai/expand', { title, content });
  return response.data.result;
};

export const improveWriting = async (title, content) => {
  const response = await api.post('/ai/improve', { title, content });
  return response.data.result;
};

export const generateTags = async (title, content) => {
  const response = await api.post('/ai/tags', { title, content });
  return response.data.result;
};
