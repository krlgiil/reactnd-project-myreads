import React from 'react'
import Control from './Control'

class Book extends React.Component {
    render() {
        const { title, authors, cover, shelf } = this.props.book;
        return (
          <div className="book">
            <div className="book-top">
            <div className="book-cover" style={{ width: cover.width, height: cover.height, backgroundImage: `url("${cover.url}")` }}></div>
              <Control bookName={title} currentShelf={shelf} handler={this.props.handler}/>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors}</div>
          </div>
        );
    }
}

export default Book;