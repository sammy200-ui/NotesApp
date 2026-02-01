const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Summarize note content
const summarizeNote = async (req, res) => {
  try {
    const { content, title } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a smart assistant that summarizes personal notes. Understand the context and intent behind what the user wrote. Preserve abbreviations, acronyms, and shorthand as the user intended them. Provide a clear summary in 2-3 sentences.',
        },
        {
          role: 'user',
          content: `Title: ${title || 'Untitled'}\n\n${content}`,
        },
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.3,
      max_tokens: 200,
    });

    const summary = chatCompletion.choices[0]?.message?.content || '';
    res.json({ result: summary });
  } catch (error) {
    console.error('AI Summarize Error:', error);
    res.status(500).json({ message: 'Failed to summarize note' });
  }
};

// Expand/elaborate on note content
const expandNote = async (req, res) => {
  try {
    const { content, title } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a smart assistant that expands on personal notes. Understand the context and add relevant details, examples, or explanations. Keep abbreviations and shorthand intact unless expansion helps clarity.',
        },
        {
          role: 'user',
          content: `Expand on this note:\n\nTitle: ${title || 'Untitled'}\n\n${content}`,
        },
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
      max_tokens: 500,
    });

    const expanded = chatCompletion.choices[0]?.message?.content || '';
    res.json({ result: expanded });
  } catch (error) {
    console.error('AI Expand Error:', error);
    res.status(500).json({ message: 'Failed to expand note' });
  }
};

// Fix grammar and improve writing
const improveWriting = async (req, res) => {
  try {
    const { content, title } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a writing assistant. Fix grammar, spelling, and punctuation while preserving the original meaning and any abbreviations or shorthand the user used. Return only the corrected text.',
        },
        {
          role: 'user',
          content: `Improve this note:\n\nTitle: ${title || 'Untitled'}\n\n${content}`,
        },
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.3,
      max_tokens: 1000,
    });

    const improved = chatCompletion.choices[0]?.message?.content || '';
    res.json({ result: improved });
  } catch (error) {
    console.error('AI Improve Error:', error);
    res.status(500).json({ message: 'Failed to improve writing' });
  }
};

// Generate tags for a note
const generateTags = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'Generate 3-5 relevant lowercase tags for this note. Return only comma-separated tags, nothing else.',
        },
        {
          role: 'user',
          content: `Title: ${title || 'Untitled'}\n\n${content}`,
        },
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.5,
      max_tokens: 50,
    });

    const tagsString = chatCompletion.choices[0]?.message?.content || '';
    const tags = tagsString.split(',').map(tag => tag.trim().toLowerCase()).filter(tag => tag);
    res.json({ result: tags });
  } catch (error) {
    console.error('AI Tags Error:', error);
    res.status(500).json({ message: 'Failed to generate tags' });
  }
};

module.exports = {
  summarizeNote,
  expandNote,
  improveWriting,
  generateTags,
};
