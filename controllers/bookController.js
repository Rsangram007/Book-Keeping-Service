const Book = require('../models/Book');
const Library = require('../models/Library');
const User = require('../models/userModel');
const { StatusCodes } = require('http-status-codes');
const CustomError = require("../errors")
const { bucket } = require('../utils/firebase');

const getBooks = async (req, res) => {
  const books = await Book.find().populate('author').populate('library').populate('borrower');
  res.status(StatusCodes.OK).json({ books });
};

const getBookById = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id).populate('author').populate('library').populate('borrower');
  if (!book) {
    throw new CustomError.NotFoundError(`No book with id: ${id}`);
  }
  res.status(StatusCodes.OK).json({ book });
};

const createBook = async (req, res) => {
  const { title, author, library } = req.body;
  const file = req.file;
// console.log(file)
  

  if (!file) {
    throw new CustomError.BadRequestError('Please upload an image');
  }
  const blob = bucket.file(`book-covers/${Date.now()}_${file.originalname}`);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: file.mimetype
    }
  });
  blobStream.end(file.buffer);
  blobStream.on('finish', async () => {
    const imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

    console.log(imageUrl)
    const book = await Book.create({ title, author, library, image: imageUrl });
    res.status(StatusCodes.CREATED).json({ book });
  });
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  if (!book) {
    throw new CustomError.NotFoundError(`No book with id: ${id}`);
  }
  res.status(StatusCodes.OK).json({ book });
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findByIdAndDelete(id);
  if (!book) {
    throw new CustomError.NotFoundError(`No book with id: ${id}`);
  }
  res.status(StatusCodes.OK).json({ msg: 'Success! Book removed.' });
};

module.exports = { getBooks, getBookById, createBook, updateBook, deleteBook };
