
// params:  books (array)
// returns: number of books
function getTotalBooksCount(books) {
  return books.length;
}

// params:  accounts (array)
// returns: number of accounts
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

// params:  books (array)
// returns: number of books currently checked out
function getBooksBorrowedCount(books) {
  return books.filter(book => !book.borrows[0].returned).length;
}

// params:  books (array)
// returns: array (length <= 5) of most common genres with count
function getMostCommonGenres(books) {
  let arrayOfGenres = books.reduce(transformBooksIntoGenres, []);
  arrayOfGenres.sort((genreA, genreB) => genreB.count - genreA.count);
  return arrayOfGenres.filter((genre, index) => index < 5);
}

// params:  genreList (array)
//          book (object)
// returns: genreList mutated to include a tally of book's genre
function transformBooksIntoGenres(genreList, book) {
  let category = genreList.find(cat => cat.name === book.genre);
    if(category) {
      category.count++;
    } else {
      category = {"name": book.genre, "count" : 1};
      genreList.push(category);
    }
    return genreList;
}

// params:  books (array)
// returns: array (length <= 5) of most popular books in library
function getMostPopularBooks(books) {
  let popularBooks = books.map(book => ({"name": book.title, "count": book.borrows.length}));
  popularBooks.sort((bookA, bookB) => bookB.count - bookA.count);
  return popularBooks.filter((book, index) => index < 5);
}

// params:  books (array)
//          authors (array)
// returns: array (length <= 5) of most popular authors
function getMostPopularAuthors(books, authors) {
  let popularAuthors = authors.map(author => ({"id": author.id, "name": `${author.name.first} ${author.name.last}`, "count": 0}));
  books.reduce(addUpBooksByAuthor, popularAuthors);
  popularAuthors.sort((authorA, authorB) => authorB.count - authorA.count);
  return popularAuthors.map(({name, count}) => ({name, count})).filter((author, index) => index < 5);
}

function addUpBooksByAuthor(popularAuthors, book) {
  let author = popularAuthors.find(current => current.id === book.authorId);
  author.count += book.borrows.length;
  return popularAuthors;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
