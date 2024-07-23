const Book = require('../models/Book');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const borrowBook = async (req, res) => {
  const { bookId, borrowerId, charge } = req.body;

  // Check if the book exists and is not already borrowed
  const book = await Book.findById(bookId);
  if (!book) {
    throw new CustomError.NotFoundError(`No book found with id: ${bookId}`);
  }
  if (book.borrower) {
    throw new CustomError.BadRequestError('Book is already borrowed');
  }

  // Update the book's borrower and charge
  book.borrower = borrowerId;
  book.charge = charge;
  await book.save();

  res.status(StatusCodes.OK).json({ book });
};

const returnBook = async (req, res) => {
  const { id: bookId } = req.params;

  // Check if the book exists
  const book = await Book.findById(bookId);
  if (!book) {
    throw new CustomError.NotFoundError(`No book found with id: ${bookId}`);
  }

  // Update the book's borrower to null and clear the charge
  book.borrower = null;
  book.charge = null;
  await book.save();

  res.status(StatusCodes.OK).json({ book });
};

module.exports = {
  borrowBook,
  returnBook,
};
