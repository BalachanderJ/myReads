import React, { Component } from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'


class Search extends Component {
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to='/'
                        className='close-search'
                    >Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" onChange={this.props.onTextChange} placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        <BookShelf books={this.props.results} onChange={this.props.onChange}/>
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search