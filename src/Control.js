import React from 'react';

class Control extends React.Component {
    render() {
        const options = {
            'currentlyReading': 'Currently Reading',
            'wantToRead': 'Want to Read',
            'read': 'Read',
            'none': 'None'
        };
        return (
          <div className="book-shelf-changer">
            <select value={this.props.currentShelf} onChange={event => this.props.handler(this.props.bookName, event.target.value)}>
              <option value="" disabled>Move to...</option>
              {Object.keys(options).map(opt => {
                  return (<option key={opt} value={opt}>{options[opt]}</option>)
              })}
            </select>
          </div>
    );
    }
}

export default Control;