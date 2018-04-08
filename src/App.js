import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';
import './App.css';
import SearchInput from './SearchInput';

class BooksApp extends React.Component {
  state = {
    data: [], //books to list in the shelves
    results: [] //books returned by the searches
  };

  componentDidMount() {
      return BooksAPI.getAll().then(data => {
      this.setState({data: data});
    })
  }

  /**
   * Returns the list of books for a specific shelf
   * @param {string} shelf 
   */
  getShelfBooks(shelf) {
    return shelf === 'search' ? this.state.results : this.state.data.filter(book => shelf === book.shelf);
  }

  /**
   * Search books based on the search terms
   * @param {Event} event 
   */
  searchBooks(event) {
    const searchValue = event ? event.target.value : null;
    if (searchValue) {
      BooksAPI.search(searchValue).then(books => {
        this.setState({
          results: this.getUpdatedBooks(books)
        });
      })
      .catch(err => console.log(err));
    } else {
      this.setState({
        results: []
      });
    }
  }

  /**
   * Returns the books updated with their shelves
   * @param {Array} books 
   */
  getUpdatedBooks(books) {
    let data = [];
    if (books && typeof books.error === 'undefined') {
      //List of books Ids on the shelves
      const booksId = this.state.data.map(book => book.id);
      data = books.map(book => {
        //If an existing book in the shelves, is returned during the search then update the shelf
        //as books in the shelves and in the search are in 2 different objects
        if (booksId.indexOf(book.id) !== -1) {
          const bookId = book.id;
          const shelf = this.state.data.filter(book => book.id === bookId)[0].shelf;
          book.shelf = shelf;
        }

        return book;
      });
    }

    return data;
  }

  /**
   * Initialize the values of the books objects
   */
  initResults() {
    BooksAPI.getAll().then(data => {
      this.setState({
        data: data,
        results: []
      });
    });
  }

  /**
   * Handler to manage the control actions of the products on the search page
   * 
   * @param {string} bookName 
   * @param {string} shelfTarget 
   */
  shelfHandler(bookName, shelfTarget) {
    this.setState(prevState => {
      let newState = prevState;
      const book = newState.data.filter(book => book.title === bookName)[0];
      newState.data.filter(book => book.title === bookName)[0].shelf = shelfTarget;
      BooksAPI.update(book, shelfTarget);

      return newState;
    });
  }

  /**
   * Handler to manage the control actions of the products on the main page
   * 
   * @param {string} bookName 
   * @param {string} shelfTarget 
   */
  searchHandler(bookName, shelfTarget) {
    this.setState(prevState => {
      let newState = prevState;
      const book = newState.results.filter(book => book.title === bookName)[0];
      newState.results.filter(book => book.title === bookName)[0].shelf = shelfTarget;
      BooksAPI.update(book, shelfTarget);

      return newState;
    });
  }
  
  render() {
    return (
      <div className="app">
          <Route path="/search" render={() => {
            return (
              <div className="list-books">
                <SearchInput searchBooks={this.searchBooks.bind(this)} initResults={this.initResults.bind(this)} />
                <div className="list-books-title">
                  <h1>Search Books</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <BookShelf shelf="search" getShelfBooks={this.getShelfBooks.bind(this)} handler={this.searchHandler.bind(this)}/>
                  </div>
                </div>
              </div>
            );
          }} />
          <Route exact path="/" render={() => {
            return (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <BookShelf shelf="currentlyReading" getShelfBooks={this.getShelfBooks.bind(this)} handler={this.shelfHandler.bind(this)}/>
                    <BookShelf shelf="wantToRead" getShelfBooks={this.getShelfBooks.bind(this)} handler={this.shelfHandler.bind(this)}/>
                    <BookShelf shelf="read" getShelfBooks={this.getShelfBooks.bind(this)} handler={this.shelfHandler.bind(this)}/>
                  </div>
                </div>
                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
              </div>
            );
          }} />
    </div>
    );
  }
}

export default BooksApp;
