const fs = require("fs");
const book = require("./book");

const roleEnum = {
    LIBRARY: 1,
    MEMBER: 2,
    GUEST: 3
}

function storeBook(book){
    fs.appendFile("books.txt", book + "\r\n", function(error){
        if(error){
            return "Unable to store this book."
        }
        return "OK !";
    });
    
}

function hasLibraryRole(role){
    return role == roleEnum.LIBRARY;
}

module.exports = {
    newBook: function(bookName, authorName, user){
        const userRole = user.role
        //Check if user has authorization to perform this action
        if(!hasLibraryRole(userRole))  {
            console.log("Access denied");
            return;
        }

        //Create book object
        const book = {
            bookName: bookName,
            authorName: authorName
        }
        //Store the book
        const res = storeBook(JSON.stringify(book));
        console.log(res);
    },
    displayAllBook: function(){
        
    }
}