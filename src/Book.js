import React from 'react';
import Control from './Control';

class Book extends React.Component {
    render() {
        const { title, authors, imageLinks, shelf } = this.props.book;

        const properties = { width: 128, height: 192 };
        if (typeof imageLinks !== 'undefined') {
          properties.backgroundImage = `url("${imageLinks.thumbnail}")`;
        }

        return (
          <div className="book">
            <div className="book-top">
            <div className="book-cover" style={properties}></div>
              <Control bookName={title} currentShelf={shelf ? shelf : 'none'} handler={this.props.handler}/>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors}</div>
          </div>
        );
    }
}

export default Book;