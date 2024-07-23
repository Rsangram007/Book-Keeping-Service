const mongoose = require('mongoose');

const LibrarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
  },
  address: {
    type: String,
    required: [true, 'Please provide address'],
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }]
});

module.exports = mongoose.model('Library', LibrarySchema);
