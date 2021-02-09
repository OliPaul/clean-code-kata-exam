const bookManager = require('./book_manager');
module.exports = {
    addBook: function(book){
        const resultat = bookManager.storeBook(book);
        return resultat;
    },
    getAllBooks: function(){
        const books = bookManager.retrieveBooksFromFile();
        return books;
    },
    getBookByName: function(bookName){
        const book = bookManager.retrieveBookByName(bookName);
        console.log(book);
        return book;
    }
}
