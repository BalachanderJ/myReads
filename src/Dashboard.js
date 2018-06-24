import React, { Component } from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'


class Dashboard extends Component {
    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <BookShelf books={this.props.currentlyReading} onChange={this.props.onChange}/>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <BookShelf books={this.props.wantToRead} onChange={this.props.onChange}/>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <BookShelf books={this.props.read} onChange={this.props.onChange}/>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link
                        to='/search'
                        className='add-contact'
                        onClick={this.props.onSearchClicked}
                    >Add a Book</Link>
                </div>
            </div>
        )
    }
}

export default Dashboard