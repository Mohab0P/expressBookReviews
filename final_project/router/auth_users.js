const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
  // Check if username exists in the users array
  return users.some(user => user.username === username);
}

const authenticatedUser = (username,password)=>{ //returns boolean
  // Check if username and password match the one we have in records
  const user = users.find(user => user.username === username && user.password === password);
  return user ? true : false;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  // Check if username and password are provided
  if (!username) {
    return res.status(400).json({message: "Username is required"});
  }
  
  if (!password) {
    return res.status(400).json({message: "Password is required"});
  }
  
  // Check if user is valid and authenticated
  if (!isValid(username)) {
    return res.status(401).json({message: "Invalid username"});
  }
  
  if (!authenticatedUser(username, password)) {
    return res.status(401).json({message: "Invalid password"});
  }
  
  // Generate JWT token
  let accessToken = jwt.sign({
    data: username
  }, 'access', { expiresIn: '1h' });
  
  // Store access token in session
  req.session.authorization = {
    accessToken
  };
  
  return res.status(200).json({message: "User successfully logged in", token: accessToken});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.body.review;
  const username = req.user.data; // Get username from JWT token (set by auth middleware)
  
  // Check if review content is provided
  if (!review) {
    return res.status(400).json({message: "Review content is required"});
  }
  
  // Check if book exists
  if (!books[isbn]) {
    return res.status(404).json({message: "Book not found"});
  }
  
  // Add or update the review for this user
  books[isbn].reviews[username] = review;
  
  return res.status(200).json({
    message: "Review added/updated successfully",
    book: books[isbn].title,
    review: review
  });
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.user.data; // Get username from JWT token (set by auth middleware)
  
  // Check if book exists
  if (!books[isbn]) {
    return res.status(404).json({message: "Book not found"});
  }
  
  // Check if user has a review for this book
  if (!books[isbn].reviews[username]) {
    return res.status(404).json({message: "No review found for this user"});
  }
  
  // Delete the user's review
  delete books[isbn].reviews[username];
  
  return res.status(200).json({
    message: "Review deleted successfully",
    book: books[isbn].title
  });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
