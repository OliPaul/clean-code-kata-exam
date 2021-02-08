const fs = require('fs');
const {roleEnum} = require("./role");
const fileManager = require("./file_manager");

const removeLines = (data, lines = []) => {

    var value = null;

    return data
        .split('\n')
        .filter((val, idx) => {
            try {
                value = JSON.parse(val);
            } catch (e) {
                //Avoid stop execution
            }
            return !lines.includes(JSON.stringify({ userID: value.userID, book: value.book }));
        })
        .join('\n');
}

module.exports = {
    hasLibraryRole: function(role){
        return role == roleEnum.LIBRARY;
    },
    
    hasMemberRole: function(role){
        return role == roleEnum.MEMBER;
    },
    
    booksExist: function(bookList, bookFile){
        var books = [];
    
        bookList.forEach((book) => {
            const aBook = bookFile.getBookByName(book.bookName);
            if(aBook){
                books.push(aBook);
            }
        });
    
        if(books.length != bookList.length){
            console.log("A book among your selection does not exist. Please try again!");
            return false;
        }
    
        return true
    },
    
    storeBorrow: function(bookList, userID){
        //Create the borrow object
        bookList.forEach((book) => {
    
            const oBorrow = {
                userID: userID,
                book: book,
                expirationDate: new Date().setDate(new Date().getDate() + 28)
            }
    
            //Store the borrow
            var isBorrowStored = fileManager.write("borrowing.txt", JSON.stringify(oBorrow));
            if(!isBorrowStored){
                return "Something went wrong !";
            }
    
            return "OK !"
        })
    },

    deleteBorrow: function(dataToDelete){

        const data = fileManager.read("borrowing.txt");
        return fileManager.delete("borrowing.txt", removeLines(data, dataToDelete));
    }
}