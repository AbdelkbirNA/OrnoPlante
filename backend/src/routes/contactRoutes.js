const express = require('express');
const router = express.Router();

const {
  createContactMessage,
  getAllContactMessages,
} = require('../controllers/contactController');

// Routes
router.post('/contact', createContactMessage);
router.get('/contact', getAllContactMessages);

module.exports = router;
