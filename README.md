# 📚 Express Book Reviews API

> A comprehensive RESTful API for managing books and reviews built with Node.js and Express.js

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18+-blue.svg)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## ✨ Features

- 🔍 **Book Discovery**: Search books by ISBN, author, or title
- 👤 **User Management**: User registration and authentication
- 📝 **Review System**: Add and manage book reviews
- 🔐 **Secure Authentication**: JWT-based authentication with session management
- 📖 **RESTful API**: Clean and intuitive API endpoints
- 🎯 **Error Handling**: Comprehensive error responses

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/expressBookReviews.git
   cd expressBookReviews/final_project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Server will be running at** `http://localhost:5000`

## 📋 API Documentation

### Public Endpoints

| Method | Endpoint | Description | Example |
|--------|----------|-------------|---------|
| `GET` | `/` | Get all books | `http://localhost:5000/` |
| `GET` | `/isbn/:isbn` | Get book by ISBN | `http://localhost:5000/isbn/1` |
| `GET` | `/author/:author` | Get books by author | `http://localhost:5000/author/Jane%20Austen` |
| `GET` | `/title/:title` | Get books by title | `http://localhost:5000/title/Pride%20and%20Prejudice` |
| `GET` | `/review/:isbn` | Get reviews for a book | `http://localhost:5000/review/1` |
| `POST` | `/register` | Register new user | Body: `{"username": "user", "password": "pass"}` |

### Protected Endpoints (Require Authentication)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/customer/login` | User login |
| `PUT` | `/customer/auth/review/:isbn` | Add/Update book review |

## 🔧 Usage Examples

### Register a New User

```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username": "bookworm", "password": "mypassword123"}'
```

### Get All Books

```bash
curl http://localhost:5000/
```

### Search Books by Author

```bash
curl http://localhost:5000/author/Chinua%20Achebe
```

### Get Book Reviews

```bash
curl http://localhost:5000/review/1
```

## 📁 Project Structure

```
final_project/
├── index.js              # Main application entry point
├── package.json           # Project dependencies and scripts
├── router/
│   ├── auth_users.js     # Authentication and user routes
│   ├── booksdb.js        # Book database (sample data)
│   └── general.js        # Public API routes
└── README.md             # Project documentation
```

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Authentication**: JSON Web Tokens (JWT)
- **Session Management**: express-session
- **Development**: nodemon for hot reloading

## 📊 Sample Data

The API comes with pre-loaded sample books including classics like:
- "Things Fall Apart" by Chinua Achebe
- "Pride and Prejudice" by Jane Austen
- "The Divine Comedy" by Dante Alighieri
- And many more...

## 🔐 Authentication Flow

1. **Register**: Create a new user account using `/register`
2. **Login**: Authenticate with `/customer/login` to receive a JWT token
3. **Access Protected Routes**: Use the token to access routes under `/customer/auth/*`

## 🧪 Testing

You can test the API using:
- **Postman**: Import the endpoints and test with different payloads
- **cURL**: Use the command-line examples provided above
- **Browser**: For GET endpoints, simply visit the URLs

## 🚨 Error Handling

The API provides comprehensive error responses:

- `400 Bad Request`: Missing required fields
- `401 Unauthorized`: Invalid authentication
- `403 Forbidden`: Access denied
- `404 Not Found`: Resource not found
- `409 Conflict`: Duplicate username during registration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Created as part of an Express.js learning project.

## 🙏 Acknowledgments

- Built following RESTful API best practices
- Inspired by modern book review platforms
- Thanks to the Node.js and Express.js communities

---

⭐ **Star this repository if it helped you!**