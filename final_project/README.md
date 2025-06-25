# 📚 Express Book Reviews - Final Project

> RESTful API implementation for book management and reviews

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Server runs on http://localhost:5000
```

## 📋 Available Scripts

- `npm start` - Start the server with nodemon (auto-restart on changes)
- `npm test` - Run tests (currently not implemented)

## 🔧 Configuration

- **Port**: 5000 (default)
- **Session Secret**: "fingerprint_customer"
- **JWT Secret**: "access"

## 📁 Key Files

- `index.js` - Main server configuration and middleware setup
- `router/general.js` - Public API routes
- `router/auth_users.js` - Authentication and protected routes
- `router/booksdb.js` - Sample book data

## 🔗 API Endpoints

### Public Routes
- `GET /` - List all books
- `GET /books/async` - Get all books using async callback
- `GET /books/promise` - Get all books using Promise
- `GET /books/await` - Get all books using async/await
- `GET /isbn/:isbn` - Get book by ISBN (synchronous)
- `GET /isbn-promise/:isbn` - Get book by ISBN using Promise
- `GET /isbn-async/:isbn` - Get book by ISBN using async/await
- `GET /author/:author` - Get books by author
- `GET /title/:title` - Get books by title
- `GET /review/:isbn` - Get book reviews
- `POST /register` - Register new user

### Protected Routes (require authentication)
- `POST /customer/login` - User login
- `PUT /customer/auth/review/:isbn` - Add/update review
- `DELETE /customer/auth/review/:isbn` - Delete user's review

## 📦 Dependencies

```json
{
  "express": "^4.18.1",
  "express-session": "^1.17.3", 
  "jsonwebtoken": "^8.5.1",
  "nodemon": "^2.0.19"
}
```

## 🛡️ Security Features

- JWT-based authentication
- Session management
- Input validation
- Error handling

---

For detailed documentation, see the main [README](../README.md).