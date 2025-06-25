const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Async function to get all books using callback
function getAllBooks(callback) {
  // Simulate async operation (like database call)
  setTimeout(() => {
    try {
      // Return books data through callback
      callback(null, books);
    } catch (error) {
      callback(error, null);
    }
  }, 1000); // 1 second delay to simulate async operation
}

// Promise-based version
function getAllBooksPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(books);
      } catch (error) {
        reject(error);
      }
    }, 800); // 800ms delay
  });
}

// Async/await wrapper function
async function getAllBooksAsync() {
  try {
    const booksData = await getAllBooksPromise();
    return booksData;
  } catch (error) {
    throw error;
  }
}

public_users.post("/register", (req,res) => {
  // Get username and password from request body
  const username = req.body.username;
  const password = req.body.password;
  
  // Check if username and password are provided
  if (!username) {
    return res.status(400).json({message: "Username is required"});
  }
  
  if (!password) {
    return res.status(400).json({message: "Password is required"});
  }
  
  // Check if username already exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(409).json({message: "Username already exists"});
  }
  
  // Register the new user
  users.push({
    username: username,
    password: password
  });
  
  return res.status(201).json({message: "User registered successfully"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    // Send the list of books available in the shop
    res.send(JSON.stringify(books, null, 4));
});

// Get all books using async callback function
public_users.get('/books/async', function (req, res) {
  // Use the async callback function to get books
  getAllBooks((error, booksData) => {
    if (error) {
      return res.status(500).json({
        message: "Error retrieving books",
        error: error.message
      });
    }
    
    // Send the books data with success message
    res.status(200).json({
      message: "Books retrieved successfully using async callback",
      totalBooks: Object.keys(booksData).length,
      books: booksData
    });
  });
});

// Get all books using Promise
public_users.get('/books/promise', function (req, res) {
  // Use the promise-based function to get books
  getAllBooksPromise()
    .then(booksData => {
      // Send the books data with success message
      res.status(200).json({
        message: "Books retrieved successfully using Promise",
        totalBooks: Object.keys(booksData).length,
        books: booksData
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Error retrieving books",
        error: error.message
      });
    });
});

// Get all books using async/await
public_users.get('/books/await', async function (req, res) {
  try {
    // Use the async/await function to get books
    const booksData = await getAllBooksAsync();
    
    // Send the books data with success message
    res.status(200).json({
      message: "Books retrieved successfully using async/await",
      totalBooks: Object.keys(booksData).length,
      books: booksData
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving books",
      error: error.message
    });
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  // Retrieve the ISBN from the request parameters
  const isbn = req.params.isbn;
  
  // Check if the book exists
  if (books[isbn]) {
    // Return the book details
    res.send(JSON.stringify(books[isbn], null, 4));
  } else {
    // Return error if book not found
    return res.status(404).json({message: "Book not found"});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  // Get the author from request parameters
  const author = req.params.author;
  
  // Get all the keys for the 'books' object
  const bookKeys = Object.keys(books);
  
  // Array to store matching books
  let matchingBooks = [];
  
  // Iterate through the 'books' array & check if author matches
  bookKeys.forEach(key => {
    if (books[key].author.toLowerCase() === author.toLowerCase()) {
      matchingBooks.push(books[key]);
    }
  });
  
  // Check if any books were found
  if (matchingBooks.length > 0) {
    res.send(JSON.stringify(matchingBooks, null, 4));
  } else {
    return res.status(404).json({message: "No books found for this author"});
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  // Get the title from request parameters
  const title = req.params.title;
  
  // Get all the keys for the 'books' object
  const bookKeys = Object.keys(books);
  
  // Array to store matching books
  let matchingBooks = [];
  
  // Iterate through the 'books' array & check if title matches
  bookKeys.forEach(key => {
    if (books[key].title.toLowerCase() === title.toLowerCase()) {
      matchingBooks.push(books[key]);
    }
  });
  
  // Check if any books were found
  if (matchingBooks.length > 0) {
    res.send(JSON.stringify(matchingBooks, null, 4));
  } else {
    return res.status(404).json({message: "No books found with this title"});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  // Get the ISBN from request parameters
  const isbn = req.params.isbn;
  
  // Check if the book exists
  if (books[isbn]) {
    // Get the reviews for the book
    const reviews = books[isbn].reviews;
    res.send(JSON.stringify(reviews, null, 4));
  } else {
    // Return error if book not found
    return res.status(404).json({message: "Book not found"});
  }
});

// Promise-based function to get book by ISBN
function getBookByISBNPromise(isbn) {
  return new Promise((resolve, reject) => {
    // Simulate async operation (like database call)
    setTimeout(() => {
      try {
        // Check if the book exists
        if (books[isbn]) {
          resolve({
            success: true,
            book: books[isbn],
            isbn: isbn
          });
        } else {
          reject({
            success: false,
            message: "Book not found",
            isbn: isbn
          });
        }
      } catch (error) {
        reject({
          success: false,
          message: "Error retrieving book",
          error: error.message,
          isbn: isbn
        });
      }
    }, 500); // 500ms delay to simulate async operation
  });
}

// Get book details by ISBN using Promise
public_users.get('/isbn/promise/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  
  // Use the promise-based function to get book by ISBN
  getBookByISBNPromise(isbn)
    .then(response => {
      if (response.success) {
        // Send the book details if found
        res.status(200).json({
          message: "Book retrieved successfully using Promise",
          book: response.book
        });
      } else {
        // Send not found message
        res.status(404).json({
          message: response.message
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Error retrieving book",
        error: error.message
      });
    });
});

// Get book details by ISBN using async/await
public_users.get('/isbn/await/:isbn', async function (req, res) {
  const isbn = req.params.isbn;
  
  try {
    // Use the async/await function to get book by ISBN
    const response = await getBookByISBNPromise(isbn);
    
    if (response.success) {
      // Send the book details if found
      res.status(200).json({
        message: "Book retrieved successfully using async/await",
        book: response.book
      });
    } else {
      // Send not found message
      res.status(404).json({
        message: response.message
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving book",
      error: error.message
    });
  }
});

// Get book details based on ISBN using Promise
public_users.get('/isbn-promise/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  
  // Use the Promise-based function to get book by ISBN
  getBookByISBNPromise(isbn)
    .then(result => {
      // Send successful response with book details
      res.status(200).json({
        message: "Book retrieved successfully using Promise",
        isbn: result.isbn,
        book: result.book
      });
    })
    .catch(error => {
      // Handle different error cases
      if (error.message === "Book not found") {
        res.status(404).json({
          message: error.message,
          isbn: error.isbn
        });
      } else {
        res.status(500).json({
          message: "Error retrieving book",
          error: error.message || error,
          isbn: error.isbn
        });
      }
    });
});

// Get book details based on ISBN using async/await
public_users.get('/isbn-async/:isbn', async function (req, res) {
  const isbn = req.params.isbn;
  
  try {
    // Use the Promise-based function with async/await
    const result = await getBookByISBNPromise(isbn);
    
    // Send successful response with book details
    res.status(200).json({
      message: "Book retrieved successfully using async/await",
      isbn: result.isbn,
      book: result.book
    });
  } catch (error) {
    // Handle different error cases
    if (error.message === "Book not found") {
      res.status(404).json({
        message: error.message,
        isbn: error.isbn
      });
    } else {
      res.status(500).json({
        message: "Error retrieving book",
        error: error.message || error,
        isbn: error.isbn
      });
    }
  }
});

module.exports.general = public_users;
