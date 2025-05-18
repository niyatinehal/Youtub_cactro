const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Log = require('../models/Log');

router.get('/', async (req, res) => {
  const comments = await Comment.find({ videoId: req.query.videoId });
  res.json(comments);
});

router.post('/', async (req, res) => {
  const comment = await Comment.create(req.body);
  await Log.create({ action: 'Add Comment', details: comment });
  res.status(201).json(comment);
});

router.delete('/:id', async (req, res) => {
  const deleted = await Comment.findByIdAndDelete(req.params.id);
  await Log.create({ action: 'Delete Comment', details: deleted });
  res.json({ success: true });
});

module.exports = router;