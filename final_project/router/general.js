const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;

const public_users = express.Router();



public_users.post("/register", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (isValid(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  //Write your code here

  //return res.send(JSON.stringify(books)); 
  
  return res.status(300).send(books);
});


public_users.get('/pc', function (req, res) {
  //Write your code here

  //return res.send(JSON.stringify(books)); 

  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Promise resolved")
    },6000)})


    myPromise.then((successMessage) => {
      return res.status(300).send(books);
    })
  
  
});



// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  let book;

  if (isbn >= 1 && isbn <= 10) {
    book = "IBSN : " + isbn;
  } else {
    book = "ISBN not enrolled";
  }

  return res.status(300).json(book);
});

public_users.get('/isbn/:isbn/pp', function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  let book;

  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      if (isbn >= 1 && isbn <= 10) {
        book = "IBSN : " + isbn;
      } else {
        book = "ISBN not enrolled";
      }
    },6000)})



    myPromise.then((successMessage) => {
      return res.status(300).json(book);
    })
  

  

  
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  var ret = [];

  for (var i = 1; i <= 10; i++) {
    if (books[i]['author'].includes(author)) {
      ret.push(books[i]);
    }
  }
  //Write your code here
  return res.status(300).send(ret);
});


public_users.get('/author/:author/pp', function (req, res) {
  const author = req.params.author;
  var ret = [];

  

  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      for (var i = 1; i <= 10; i++) {
        if (books[i]['author'].includes(author)) {
          ret.push(books[i]);
        }
      }
    },6000)})
  //Write your code here
  myPromise.then((successMessage) => {
    return res.status(300).send(ret);
  })
 
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  var ret = [];
  const title = req.params.title;

  for (var i = 1; i <= 10; i++) {
    if (books[i]['title'].includes(title)) {
      ret.push(books[i]);
    }
  }
  //Write your code here
  return res.status(300).send(ret);
});


public_users.get('/title/:title/pp', function (req, res) {
  var ret = [];
  const title = req.params.title;

 

  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      for (var i = 1; i <= 10; i++) {
        if (books[i]['title'].includes(title)) {
          ret.push(books[i]);
        }
      }
    },6000)})
  
  //Write your code here

  myPromise.then((successMessage) => {
    return res.status(300).send(ret);
  })
  
});


//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  let book;

  if (isbn >= 1 && isbn <= 10) {
    book = books[isbn];
  } else {
    book = "ISBN not enrolled";
  }

  return res.status(300).json(book);
});

module.exports.general = public_users;
