const express = require('express');
const {
  getLibraries,
  getLibraryById,
  createLibrary,
  updateLibrary,
  deleteLibrary,
  getLibraryInventory,
  addBookToInventory,
  removeBookFromInventory,
} = require('../controllers/libraryController');
const {
    authenticateUser,
    authorizePermissions,
  } = require("../middleware/authentication")

const router = express.Router();

router.route('/').get(authenticateUser, getLibraries).post(authenticateUser, authorizePermissions('Author'), createLibrary);
router.route('/:id').get(authenticateUser, getLibraryById).put(authenticateUser, authorizePermissions('Author'), updateLibrary).delete(authenticateUser, authorizePermissions('Author'), deleteLibrary);
router.route('/:id/inventory').get(authenticateUser, getLibraryInventory).post(authenticateUser, authorizePermissions('Author'), addBookToInventory);
router.route('/:id/inventory/:bookId').delete(authenticateUser, authorizePermissions('Author'), removeBookFromInventory);

module.exports = router;
