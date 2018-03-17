import React from 'react'
import Book from './Book'

class BookShelf extends React.Component {
    render() {
        const title = {
            "currentlyReading": "Currently Reading",
            "wantToRead": "Want to Read",
            "read": "Read"
        };

        const { shelf, getShelfBooks, handler } = this.props;
        return (
          <div className="bookshelf">
            <h2 className="bookshelf-title">{title[shelf]}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {getShelfBooks(shelf).map(book => {
                return <li key={book.title}><Book book={book} shelf={shelf} handler={handler}/></li>})}
              </ol>
            </div>
          </div>
    );
    }
}

export default BookShelf;