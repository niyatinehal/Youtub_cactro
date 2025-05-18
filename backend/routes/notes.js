const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const Log = require('../models/Log');

router.get('/', async (req, res) => {
  const search = req.query.search || '';
  const notes = await Note.find({
    videoId: req.query.videoId,
    content: { $regex: search, $options: 'i' }
  });
  res.json(notes);
});

router.post('/', async (req, res) => {
  const note = await Note.create(req.body);
  await Log.create({ action: 'Add Note', details: note });
  res.status(201).json(note);
});

module.exports = router;