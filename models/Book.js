const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide title'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide author'],
  },
  library: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Library',
    required: [true, 'Please provide library'],
  },
  borrower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  image: {
    type: String,
    required: [true, 'Please provide image'],
  },
  charge: {
    type: Number,
    default: null,
  },
});

module.exports = mongoose.model('Book', BookSchema);
