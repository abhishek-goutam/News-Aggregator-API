const axios = require('axios');

const API_KEY = 'your_news_api_key';
const BASE_URL = 'https://newsapi.org/v2';

const getNews = async (preferences) => {
  const { data } = await axios.get(`${BASE_URL}/top-headlines`, {
    params: {
      apiKey: API_KEY,
      category: preferences.category,
      country: preferences.country,
    }
  });

  return data.articles;
};

const searchNews = async (keyword) => {
  const { data } = await axios.get(`${BASE_URL}/everything`, {
    params: {
      apiKey: API_KEY,
      q: keyword,
    }
  });

  return data.articles;
};

module.exports = { getNews, searchNews };
