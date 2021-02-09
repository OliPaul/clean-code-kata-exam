const fileManager = require('../dao/file_manager');

module.exports = {
    storeBook: function (book) {
        const isStored = fileManager.write("books.txt", book);
        if (!isStored) {
            return "Unable to add this book."
        }
        return "OK !";
    },

    retrieveBooksFromFile: function () {
        const books = fileManager.read("books.txt");
        return books.split("\n");
    },

    retrieveBookByName: function (bookName) {
        const books = this.retrieveBooksFromFile();
        var oBook = null;

        books.forEach((book) => {
            try {
                const aBook = JSON.parse(book);
                if (aBook.bookName == bookName) {
                    oBook = aBook;
                    return;
                }
            } catch (e) {
                //Avoid break exection
            }
        })

        return oBook;
    }
}