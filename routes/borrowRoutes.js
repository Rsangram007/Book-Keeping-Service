const express = require('express');
const router = express.Router();
const { borrowBook, returnBook } = require('../controllers/borrowController');
const { authenticateUser } = require('../middleware/authentication');

router.post('/borrow', authenticateUser, borrowBook);
router.put('/return/:id', authenticateUser, returnBook);

module.exports = router;
