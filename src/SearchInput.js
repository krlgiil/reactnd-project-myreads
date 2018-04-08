import React from 'react';
import { Link } from 'react-router-dom';

class SearchInput extends React.Component {
    state = {
        search: ''
    };

  componentWillUnmount() {
    //When leaving the search page initialize the results object
    return this.props.initResults();
  }

  render() {
        return (
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author" defaultValue={this.state.search} onChange={this.props.searchBooks} />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid"></ol>
              </div>
            </div>
        );
    }
}

export default SearchInput;