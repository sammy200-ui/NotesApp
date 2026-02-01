const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  summarizeNote,
  expandNote,
  improveWriting,
  generateTags,
} = require('../controllers/aiController');

// All AI routes are protected
router.post('/summarize', protect, summarizeNote);
router.post('/expand', protect, expandNote);
router.post('/improve', protect, improveWriting);
router.post('/tags', protect, generateTags);

module.exports = router;
