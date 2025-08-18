const express = require('express');
const router = express.Router();
const { addFavorite, removeFavorite, getFavorites } = require('../controllers/favoriteController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/add', verifyToken, addFavorite);
router.delete('/remove', verifyToken, removeFavorite);
router.get('/', verifyToken, getFavorites);

module.exports = router;
