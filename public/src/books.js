
// params:  authors (array)
//          id (number)
// returns: author object with matching id
function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

// params:  books (array)
//          id (string)
// returns: book with matching id
function findBookById(books, id) {
  return books.find(book => book.id === id);
}

// params:  books (array)
// returns: an array with two elements: all books borrowed and all books returned
function partitionBooksByBorrowedStatus(books) {
  let result = [];
  result[0] = books.filter(book => !book.borrows[0].returned);
  result[1] = books.filter(book => book.borrows[0].returned);
  return result;
}

// params:  book (object)
//          accounts (array)
// returns: array (length <= 10) of accounts that have borrowed book
function getBorrowersForBook(book, accounts) {
  const findAccountInBorrows = (id) => {
    return book.borrows.find(borrower => borrower.id === id);
  };
  let accountsBorrowed = accounts.filter(account => {
    const accountHasBorrowed = findAccountInBorrows(account.id);
    if(accountHasBorrowed) {
      account.returned = accountHasBorrowed.returned;
      return true;
    }
    return false;
  });
  return accountsBorrowed.filter((account, index) => index < 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
