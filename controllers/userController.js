const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const newsApi = require('../utils/newsApi');

// In-memory data store
let users = [];
let newsPreferences = [];
let readArticles = [];
let favoriteArticles = [];

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: 'User registered successfully' });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ username: user.username }, 'your_jwt_secret');
  res.json({ token });
};

const getPreferences = (req, res) => {
  const username = req.user.username;
  const userPreferences = newsPreferences.find(p => p.username === username) || {};
  res.json(userPreferences);
};

const updatePreferences = (req, res) => {
  const username = req.user.username;
  const { preferences } = req.body;

  let userPreferences = newsPreferences.find(p => p.username === username);
  if (!userPreferences) {
    userPreferences = { username, preferences };
    newsPreferences.push(userPreferences);
  } else {
    userPreferences.preferences = preferences;
  }

  res.json({ message: 'Preferences updated successfully' });
};

const fetchNews = async (req, res) => {
  const username = req.user.username;
  const userPreferences = newsPreferences.find(p => p.username === username);

  if (!userPreferences) {
    return res.status(400).json({ message: 'No preferences found for user' });
  }

  try {
    const news = await newsApi.getNews(userPreferences.preferences);
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch news', error: error.message });
  }
};

const markAsRead = (req, res) => {
  const { id } = req.params;
  const username = req.user.username;
  readArticles.push({ username, articleId: id });
  res.json({ message: 'Article marked as read' });
};

const markAsFavorite = (req, res) => {
  const { id } = req.params;
  const username = req.user.username;
  favoriteArticles.push({ username, articleId: id });
  res.json({ message: 'Article marked as favorite' });
};

const getReadArticles = (req, res) => {
  const username = req.user.username;
  const userReadArticles = readArticles.filter(a => a.username === username);
  res.json(userReadArticles);
};

const getFavoriteArticles = (req, res) => {
  const username = req.user.username;
  const userFavoriteArticles = favoriteArticles.filter(a => a.username === username);
  res.json(userFavoriteArticles);
};

const searchNews = async (req, res) => {
  const { keyword } = req.params;

  try {
    const news = await newsApi.searchNews(keyword);
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Failed to search news', error: error.message });
  }
};

module.exports = {
  register,
  login,
  getPreferences,
  updatePreferences,
  fetchNews,
  markAsRead,
  markAsFavorite,
  getReadArticles,
  getFavoriteArticles,
  searchNews
};
