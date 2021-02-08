const book = require("./book");

const roleEnum = {
    LIBRARY: 1,
    MEMBER: 2,
    GUEST: 3
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
        const res = book.addBook(JSON.stringify(book));
        console.log(res);
    },
    displayAllBooks: function(){
        const books = book.getAllBooks();

        console.log(books);
    }
}