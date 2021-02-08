const bookFile = require("./book");
const LibraryManager = require("./library_manager");

module.exports = {
    newBook: function(bookName, authorName, user){
        const userRole = user.role
        //Check if user has authorization to perform this action
        if(!LibraryManager.hasLibraryRole(userRole))  {
            console.log("Access denied");
            return;
        }

        //Create book object
        const book = {
            bookName: bookName,
            authorName: authorName
        }
        //Store the book
        const res = bookFile.addBook(JSON.stringify(book));
        console.log(res);
    },
    displayAllBooks: function(){
        const books = bookFile.getAllBooks();
        console.log(books);
    },
    borrowBook: function(bookList, user){
        const userRole = user.role
        const userID = user.userID
        var message = "";

        //Check if user has authorization to perform this action
        if(!LibraryManager.hasMemberRole(userRole))  {
            console.log("You cannot borrow a book.");
            return;
        }

        //check if user has pick a book
        if(bookList.length == 0){
            console.log("You haven't choose a book.");
            return;
        }

        //check book number
        if(bookList.length > 3){
            console.log("You can borrow only 3 books at a time.");
            return;
        }

        //Check if book exist
        if(!LibraryManager.booksExist(bookList, bookFile)){
            console.log("A book among your selection does not exist. Please try again!");
            return;
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
            console.log("Access Denied !");
            return;
        }

        //check if user has a book to return
        if(bookList.length == 0){
            console.log("You don't have set a book.");
            return;
        }

        bookList.forEach((book) => {
            booksToDelete.push(`${JSON.stringify({userID: user.userID, book: book})}`);
        })

        LibraryManager.deleteBorrow(booksToDelete);
    }
}