const http = require('http');
const library = require("./library/library");
const user = require("./user/user");

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  var url = req.url;

  /**
   * This function allow Librarian to add a new book
   * Example of object :
   * {
   *     "userID": 1,
   *     "role": 1,
   *     "book": {
   *         "name": "Alibaba et les 40 voleurs",
   *         "author": "Françoise Christophe"
   *     }
   *   }
   */
  if (url === '/new-book') {
    var body = "";
    req.on("data", buffer => {
      body += buffer.toString();
    })

    req.on("end", () => {
      const data = JSON.parse(body);
      //Autentificate user
      const oUser = user.auth(data.userID, data.role);
      //Perform action
      const message = library.newBook(data.book.name, data.book.author, oUser);
      res.write(message);
      res.end();
    })

  } 
  /**
   * This function allow Client to see book list
   */
  else if (url === '/book-list') {
    //Perform action
    const message = library.displayAllBooks();
    res.write(JSON.stringify(message));
    res.end();
  } 

  /**
   * This function allow Member to borrow a book list
   * Example of object :
   * {
   *     "userID": 1,
   *     "role": 2,
   *     "book": [{
   *         "bookName": "Alibaba et les 40 voleurs",
   *         "authorName": "Françoise Christophe"
   *     }]
   *   }
   */
  else if (url === '/borrow-book') {
    var body = "";
    req.on("data", buffer => {
      body += buffer.toString();
    })

    req.on("end", () => {
      const data = JSON.parse(body);
      //Autentificate user
      const oUser = user.auth(data.userID, data.role);
      //Perform action
      const message = library.borrowBook(data.book, oUser);
      res.write(message);
      res.end();
    })
  } 

  /**
   * This function allow Member to return a book list
   * Example of object :
   * {
   *     "userID": 1,
   *     "role": 2,
   *     "book": [{
   *         "bookName": "Alibaba et les 40 voleurs",
   *         "authorName": "Françoise Christophe"
   *     }]
   *   }
   */
  else if (url === '/return-book') {
    var body = "";
    req.on("data", buffer => {
      body += buffer.toString();
    })

    req.on("end", () => {
      const data = JSON.parse(body);
      //Autentificate user
      const oUser = user.auth(data.userID, data.role);
      //Perform action
      const message = library.returnBook(data.book, oUser);
      res.write(message);
      res.end();
    })
  } 
  
  else {
    res.write('Clean Code Kata');
    res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});