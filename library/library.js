const bookFile = require("../book/book");
const LibraryManager = require("./library_manager");

module.exports = {
    newBook: function(bookName, authorName, user){
        const userRole = user.role
        //Check if user has authorization to perform this action
        if(!LibraryManager.hasLibraryRole(userRole))  {
            return "Access denied";
        }

        //Create book object
        const book = {
            bookName: bookName,
            authorName: authorName
        }
        //Store the book
        const res = bookFile.addBook(JSON.stringify(book));
        return res;
    },
    displayAllBooks: function(){
        const books = bookFile.getAllBooks();
        return books;
    },
    borrowBook: function(bookList, user){
        const userRole = user.role
        const userID = user.userID
        var message = "";

        //Check if user has authorization to perform this action
        if(!LibraryManager.hasMemberRole(userRole))  {
            return "You cannot borrow a book.";
        }

        //check if user has pick a book
        if(bookList.length == 0){
            return "You haven't choose a book.";
        }

        //check book number
        if(bookList.length > 3){
            return "You can borrow only 3 books at a time.";
        }

        //Check if book exist
        if(!LibraryManager.booksExist(bookList, bookFile)){
            return "A book among your selection does not exist. Please try again!";
        }

        message = LibraryManager.storeBorrow(bookList, userID);
        return message;
        
    },
    returnBook: function(bookList, user){
        const userRole = user.role
        var message = "";
        var booksToDelete = [];
        //Check if user has authorization to perform this action
        if(!LibraryManager.hasMemberRole(userRole))  {
            return "Access Denied !";
        }

        //check if user has a book to return
        if(bookList.length == 0){
            return "You don't have set a book.";
        }

        bookList.forEach((book) => {
            booksToDelete.push(`${JSON.stringify({userID: user.userID, book: book})}`);
        })

        LibraryManager.deleteBorrow(booksToDelete);

        return "Book successfully returned.";
    }
}