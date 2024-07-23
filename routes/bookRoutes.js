const express = require('express');
const { getBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const {
    authenticateUser,
    authorizePermissions,
  } = require("../middleware/authentication")
const { upload } = require('../utils/uploadController');

const router = express.Router();

router.route('/').get(authenticateUser, getBooks).post(authenticateUser, authorizePermissions('Author'), upload.single('image'), createBook);
router.route('/:id').get(authenticateUser, getBookById).put(authenticateUser, authorizePermissions('Author'), updateBook).delete(authenticateUser, authorizePermissions('Author'), deleteBook);

router.get('/checkbook', getBooks);

module.exports = router;
