const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return false;
    } else {
        return true;
    }
}

const authenticatedUser = (username,password)=>{ //returns boolean
    // Filter the users array for any user with the same username and password
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
    const username = req.body.username;
    const password = req.body.password;
    // Check if username or password is missing
    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
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
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    let text = req.body.text;
    let book = books[isbn];
    let username = req.session.authorization['username'];

    if(book && text){
        const reviewUsers = Object.keys(book.reviews);
        let updated = false;
        if (reviewUsers.length > 0){
            reviewUsers.forEach((name) =>{
                if(name === username){
                    book.reviews[name] = text;
                    updated = true;
                }
            });
        }
        if(reviewUsers.length == 0 || !updated){
            Object.assign(book.reviews, {[username]:  text});
        }
        books[isbn] = book;
        return res.status(200).send({ message: "Review successfully added."});
    }else{
        return res.status(404).json({ message: "No book found with ISBN" });
    }
});

//delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) =>{
    const isbn = req.params.isbn;
    let book = books[isbn];
    let username = req.session.authorization['username'];

    if(book){
        const reviewUsers = Object.keys(book.reviews);
        if (reviewUsers.length > 0){
            reviewUsers.forEach((name) =>{
                if(name === username){
                   delete book.reviews[name];
                }
            });
            books[isbn] = book;
            return res.status(200).send({message:"Review successfully deleted."});
        }else{
            return res.status(404).send({message: "There are no reviews for this book."})
        }
    }else{
        return res.status(404).json({ message: "No book found with ISBN" });
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
