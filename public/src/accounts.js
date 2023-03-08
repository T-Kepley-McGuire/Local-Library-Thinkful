
// params:  accounts (array)
//          id (string)
// returns: account with matching id
function findAccountById(accounts, id) {
  return accounts.find((account) => account["id"] === id);
}

// params:  accounts (array)
// returns: sorted accounts by last name alphabetically
function sortAccountsByLastName(accounts) {
  accounts.sort(({name: {last: lastA}}, {name: {last: lastB}}) => lastA > lastB ? 1 : -1);
  return accounts;
}

// params:  account (object)
//          books (array)
// returns: number of times account's ID appears in any book's borrows array
function getTotalNumberOfBorrows({id}, books) {
  const getNumBorrows = (total, book) => {
    const numTimesBorrowed = book.borrows.reduce((subTotal, borrower) => {
      return subTotal + (borrower.id === id ? 1 : 0);
    }, 0);
    return total + numTimesBorrowed;
  };
  return books.reduce(getNumBorrows, 0);
}

// params:  account (object)
//          books (array)
//          authors (array)
// returns: array of all book objects currently checked out by account
function getBooksPossessedByAccount({id}, books, authors) {
  const bookHasBeenCheckedOutByAccount = ({borrows}) => {
    return borrows.some((borrower) => borrower.id === id && !borrower.returned);
  };
  let allCheckedOut = books.filter(bookHasBeenCheckedOutByAccount);

  const findAuthorOfBook = (book) => {
    return authors.find((author) => author.id === book.authorId);
  }
  allCheckedOut = allCheckedOut.map((book) => {
    book.author = findAuthorOfBook(book);
    return book;
  });

  return allCheckedOut;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
