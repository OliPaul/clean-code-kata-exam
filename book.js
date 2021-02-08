const fs =  require('fs');

function retrieveBooksFromFile(){
    const books = fs.readFileSync("books.txt", "utf8");
    return books.split("\n");
}

function retrieveBook(bookName){
    const books = retrieveBooksFromFile();
    var oBook = null;

    books.forEach((book) => {
        const aBook = JSON.parse(book);
        if(aBook.bookName == bookName) {
            oBook = aBook;
            return;
        }
    })

    return oBook;
}

module.exports = {
    getAllBooks: function(){
        const books = retrieveBooksFromFile();
        return books;
    },
    getBookByName: function(bookName){
        const book = retrieveBook(bookName);
        console.log(book);
        return book;
    }
}
