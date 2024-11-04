const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
    //returns boolean
    //write code to check is the username is valid
    let isUserExists = users.filter((user) => {
        return user.username === username
    })

    if(isUserExists.length > 0) {
        return false
    } else {
        return true
    }
}

const authenticatedUser = (username,password)=>{ 
    //returns boolean
    //write code to check if username and password match the one we have in records.
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });

    // Return true if any valid user is found, otherwise false
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const {
    username,
    password
  } = req.body

  // Check if username or password is missing
  if (!username || !password) {
    return res.status(404).json({message: "Input error. please fill all fields"});
  }

  // Authenticate user
  if (authenticatedUser(username, password)) {
    // Generate JWT access token
    let accessToken = jwt.sign({
        data: password
    }, 'access', { expiresIn: 60 * 60 });
    // Store access token and username in session
    req.session.authorization = {
        accessToken, username
    }
    return res.status(200).json({ message: "Success Logged in" });
  } else {
    return res.status(208).json({ message: "Invalid Login. Check username and password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn
  const username = req.session.authorization[username]
  let book = books[isbn]

  if(book) {
    let review = book.bookReview
    review[username] = req.query.review
    //review.username = req.query.review

    books[isbn].bookReview = review

    return res.status(200).json({ message: "Your review submitted" });
  } else {
    return res.status(404).json({message: "Book not found"});
  }
  
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
