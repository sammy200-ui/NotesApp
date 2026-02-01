import { useState } from 'react';
import { summarizeNote, expandNote, improveWriting, generateTags } from '../services/aiService';
import './AITools.css';

const AITools = ({ note, onContentUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [activeAction, setActiveAction] = useState(null);
  const [aiResult, setAiResult] = useState(null);
  const [error, setError] = useState('');

  const handleAIAction = async (action) => {
    if (!note?.content) {
      setError('Note content is empty');
      return;
    }

    setLoading(true);
    setActiveAction(action);
    setError('');
    setAiResult(null);

    try {
      let result;
      switch (action) {
        case 'summarize':
          result = await summarizeNote(note.title, note.content);
          setAiResult({ type: 'summary', content: result });
          break;
        case 'expand':
          result = await expandNote(note.title, note.content);
          setAiResult({ type: 'expanded', content: result });
          break;
        case 'improve':
          result = await improveWriting(note.title, note.content);
          setAiResult({ type: 'improved', content: result });
          break;
        case 'tags':
          result = await generateTags(note.title, note.content);
          setAiResult({ type: 'tags', content: result });
          break;
        default:
          break;
      }
    } catch (err) {
      setError('AI feature failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
      setActiveAction(null);
    }
  };

  const applyResult = () => {
    if (aiResult && onContentUpdate) {
      if (aiResult.type === 'tags') {
        // For tags, we might want to handle differently
        // For now, append tags to content
        const tagsLine = `\n\nTags: ${aiResult.content.join(', ')}`;
        onContentUpdate(note.content + tagsLine);
      } else {
        onContentUpdate(aiResult.content);
      }
      setAiResult(null);
    }
  };

  const dismissResult = () => {
    setAiResult(null);
  };

  return (
    <div className="ai-tools">
      <div className="ai-tools-header">
        <span className="ai-label">AI Tools</span>
      </div>

      <div className="ai-buttons">
        <button
          className="ai-btn"
          onClick={() => handleAIAction('summarize')}
          disabled={loading}
          title="Get a brief summary"
        >
          {loading && activeAction === 'summarize' && (
            <span className="spinner-small"></span>
          )}
          Summarize
        </button>

        <button
          className="ai-btn"
          onClick={() => handleAIAction('expand')}
          disabled={loading}
          title="Expand with more details"
        >
          {loading && activeAction === 'expand' && (
            <span className="spinner-small"></span>
          )}
          Expand
        </button>

        <button
          className="ai-btn"
          onClick={() => handleAIAction('improve')}
          disabled={loading}
          title="Fix grammar and improve writing"
        >
          {loading && activeAction === 'improve' && (
            <span className="spinner-small"></span>
          )}
          Improve
        </button>

        <button
          className="ai-btn"
          onClick={() => handleAIAction('tags')}
          disabled={loading}
          title="Auto-generate tags"
        >
          {loading && activeAction === 'tags' && (
            <span className="spinner-small"></span>
          )}
          Tags
        </button>
      </div>

      {error && <div className="ai-error">{error}</div>}

      {aiResult && (
        <div className="ai-result">
          <div className="ai-result-header">
            <span className="result-type">
              {aiResult.type === 'summary' && 'Summary'}
              {aiResult.type === 'expanded' && 'Expanded Content'}
              {aiResult.type === 'improved' && 'Improved Writing'}
              {aiResult.type === 'tags' && 'Suggested Tags'}
            </span>
          </div>
          <div className="ai-result-content">
            {aiResult.type === 'tags' ? (
              <div className="tags-list">
                {aiResult.content.map((tag, index) => (
                  <span key={index} className="tag-chip">{tag}</span>
                ))}
              </div>
            ) : (
              <p>{aiResult.content}</p>
            )}
          </div>
          <div className="ai-result-actions">
            {aiResult.type !== 'summary' && (
              <button className="btn-apply" onClick={applyResult}>
                Apply to Note
              </button>
            )}
            <button className="btn-dismiss" onClick={dismissResult}>
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AITools;
