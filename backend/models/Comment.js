const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({
  videoId: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Comment', CommentSchema);