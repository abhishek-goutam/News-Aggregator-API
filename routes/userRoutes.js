const express = require('express');
const { register, login, getPreferences, updatePreferences, fetchNews, markAsRead, markAsFavorite, getReadArticles, getFavoriteArticles, searchNews } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

// Authentication routes
router.post('/register', register);
router.post('/login', login);

// User preference routes
router.get('/preferences', auth, getPreferences);
router.put('/preferences', auth, updatePreferences);

// News routes
router.get('/news', auth, fetchNews);
router.post('/news/:id/read', auth, markAsRead);
router.post('/news/:id/favorite', auth, markAsFavorite);
router.get('/news/read', auth, getReadArticles);
router.get('/news/favorites', auth, getFavoriteArticles);
router.get('/news/search/:keyword', auth, searchNews);

module.exports = router;
