const mongoose = require('mongoose');
const LogSchema = new mongoose.Schema({
    action: String,
    details: mongoose.Schema.Types.Mixed,
    createdAt: { type: Date, default: Date.now }
  });
  module.exports = mongoose.model('Log', LogSchema);