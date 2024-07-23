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


const Afterhostedresult= async (req, res) => {
  try {
    const books = await Book.find().populate('author').populate('library').populate('borrower');

    const bookList = books.map(book => `
      <div class="book-card">
        <h2>${book.title}</h2>
        <img src="${book.image}" alt="${book.title}" class="book-image">
        <div class="book-info">
          <p><strong>Author:</strong> ${book.author.name}</p>
          <p><strong>Library:</strong> ${book.library.name}</p>
          <p><strong>Borrower:</strong> ${book.borrower.name}</p>
          <p><strong>Charge:</strong> $${book.charge}</p>
        </div>
      </div>
    `).join('');

    res.send(`
      <html>
        <head>
          <title>Book List</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }
            h1 {
              color: #333;
              margin-top: 20px;
            }
            .book-card {
              background-color: #fff;
              border: 1px solid #ddd;
              border-radius: 5px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              margin: 20px;
              padding: 20px;
              width: 80%;
              max-width: 400px;
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .book-image {
              width: 100px;
              height: auto;
              border-radius: 5px;
              margin-bottom: 10px;
            }
            .book-info {
              text-align: center;
            }
            .book-info p {
              margin: 5px 0;
              color: #666;
            }
            hr {
              width: 80%;
              border: none;
              border-top: 1px solid #ddd;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <h1>All Books</h1>
          ${bookList}
        </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send('Error fetching books');
  }
}

module.exports = { getBooks, getBookById, createBook, updateBook, deleteBook ,Afterhostedresult};
