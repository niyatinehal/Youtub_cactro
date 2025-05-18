const mongoose = require('mongoose');
const NoteSchema = new mongoose.Schema({
    videoId: String,
    content: String,
    tags: [String],
    createdAt: { type: Date, default: Date.now }
  });
  module.exports = mongoose.model('Note', NoteSchema);