const Library = require('../models/Library');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const getLibraries = async (req, res) => {
  const libraries = await Library.find().populate('books');
  res.status(StatusCodes.OK).json({ libraries });
};

const getLibraryById = async (req, res) => {
  const { id } = req.params;
  const library = await Library.findById(id).populate('books');
  if (!library) {
    throw new CustomError.NotFoundError(`No library with id: ${id}`);
  }
  res.status(StatusCodes.OK).json({ library });
};

const createLibrary = async (req, res) => {
  const library = await Library.create(req.body);
  res.status(StatusCodes.CREATED).json({ library });
};

const updateLibrary = async (req, res) => {
  const { id } = req.params;
  const library = await Library.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  if (!library) {
    throw new CustomError.NotFoundError(`No library with id: ${id}`);
  }
  res.status(StatusCodes.OK).json({ library });
};

const deleteLibrary = async (req, res) => {
  const { id } = req.params;
  const library = await Library.findByIdAndDelete(id);
  if (!library) {
    throw new CustomError.NotFoundError(`No library with id: ${id}`);
  }
  res.status(StatusCodes.OK).json({ msg: 'Success! Library removed.' });
};

const getLibraryInventory = async (req, res) => {
  const { id } = req.params;
  const library = await Library.findById(id).populate('books');
  if (!library) {
    throw new CustomError.NotFoundError(`No library with id: ${id}`);
  }
  res.status(StatusCodes.OK).json({ books: library.books });
};

const addBookToInventory = async (req, res) => {
  const { id } = req.params;
  const { bookId } = req.body;
  const library = await Library.findById(id);
  if (!library) {
    throw new CustomError.NotFoundError(`No library with id: ${id}`);
  }
  library.books.push(bookId);
  await library.save();
  res.status(StatusCodes.OK).json({ msg: 'Book added to inventory' });
};

const removeBookFromInventory = async (req, res) => {
  const { id, bookId } = req.params;
  const library = await Library.findById(id);
  if (!library) {
    throw new CustomError.NotFoundError(`No library with id: ${id}`);
  }
  library.books.pull(bookId);
  await library.save();
  res.status(StatusCodes.OK).json({ msg: 'Book removed from inventory' });
};

module.exports = {
  getLibraries,
  getLibraryById,
  createLibrary,
  updateLibrary,
  deleteLibrary,
  getLibraryInventory,
  addBookToInventory,
  removeBookFromInventory
};
