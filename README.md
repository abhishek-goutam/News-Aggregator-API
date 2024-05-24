# News Aggregator API

This is a basic Node.js project using Express.js to create a news aggregator API. The API allows users to register, log in, set their news preferences, and fetch news articles based on those preferences. The project uses bcrypt for password hashing and JWT for token-based authentication.

## Features

- User registration and login
- Password hashing with bcrypt
- Token-based authentication with JWT
- In-memory data store for user information and news preferences
- Fetch news articles from external news APIs
- Endpoints to mark news articles as read or favorite
- Endpoints to search news articles by keyword

## Endpoints

### User Endpoints

- `POST /api/register`: Register a new user
- `POST /api/login`: Log in a user

### Preferences Endpoints

- `GET /api/preferences`: Retrieve the news preferences for the logged-in user
- `PUT /api/preferences`: Update the news preferences for the logged-in user

### News Endpoints

- `GET /api/news`: Fetch news articles based on the logged-in user's preferences
- `POST /api/news/:id/read`: Mark a news article as read
- `POST /api/news/:id/favorite`: Mark a news article as a favorite
- `GET /api/news/read`: Retrieve all read news articles
- `GET /api/news/favorites`: Retrieve all favorite news articles
- `GET /api/news/search/:keyword`: Search for news articles based on keywords

## Getting Started

### Prerequisites

- Node.js
- npm


