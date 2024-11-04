const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const {
    username,
    password
  } = req.body

  // Check if both username and password are provided
  if (username && password) {
    // Check if the user does not already exist
    if (isValid(username)) {
        // Add the new user to the users array
        users.push({"username": username, "password": password});
        return res.status(201).json({message: "User successfully registered. Now you can login"});
    } else {
        return res.status(209).json({message: "User already exists!"});
    }
  }

  return res.status(404).json({message: "Input error. please fill all fields"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json({
    message: "Success get data",
    data: books
});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn

  return res.status(200).json({
    message: "Success get data",
    data: books[isbn]
});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author
  let bookByAuthor = []

  for(const idx in books) {
    let book = books[idx]

    if(book.author.includes(author)) {
        bookByAuthor.push(book)
    }
  }

  return res.status(200).json({
    message: "Success get data",
    data: bookByAuthor
});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title
  let bookByTitle = []

  for(const idx in books) {
    let book = books[idx]
    
    if(book.title.includes(title)) {
        bookByTitle.push(book)
    }
  }

  return res.status(200).json({
    message: "Success get data",
    data: bookByTitle
});
})

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn
  let bookReview

  if(books[isbn].bookReview) {
    bookReview = books[isbn].bookReview
  } else {
    bookReview = {}
  }

  return res.status(200).json({
    message: "Success get data",
    data: bookReview
});
});

module.exports.general = public_users;
