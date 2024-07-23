const Book = require('../models/Book');
const Library = require('../models/Library');
const User = require('../models/userModel');
const { StatusCodes } = require('http-status-codes');
const CustomError = require("../errors")
const { bucket } = require('../utils/firebase');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');


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

  if (!file) {
    throw new CustomError.BadRequestError('Please upload an image');
  }

  const storageRef = ref(bucket, `book-covers/${Date.now()}_${file.originalname}`);
  
  uploadBytes(storageRef, file.buffer, {
    contentType: file.mimetype,
  }).then((snapshot) => {
    getDownloadURL(snapshot.ref).then(async (downloadURL) => {
      const book = await Book.create({ title, author, library, image: downloadURL });
      res.status(StatusCodes.CREATED).json({ book });
    }).catch(error => {
      throw new CustomError.BadRequestError('Failed to get download URL');
    });
  }).catch(error => {
    throw new CustomError.BadRequestError('Image upload failed');
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
