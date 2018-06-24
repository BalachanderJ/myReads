import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import Search from './Search'
import Dashboard from './Dashboard'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
      currentlyReading:[],
      wantToRead:[],
      read:[],
      results: []
  }


    componentDidMount() {
        BooksAPI.getAll()
            .then((books) => {
                this.setState(() => ({
                    currentlyReading: books.filter((book) => { return book.shelf === "currentlyReading"}),
                    wantToRead: books.filter((book) => book.shelf === "wantToRead"),
                    read: books.filter((book) => book.shelf === "read")
                }))
            })
    }

    onSelectionChanged(e, book) {
        book.shelf = e.target.value;
        switch(e.target.value) {
            case 'currentlyReading':
                this.setState((currState) => ({
                    currentlyReading: currState.currentlyReading.concat([book]),
                    wantToRead: currState.wantToRead.filter((wantToReadBook) => wantToReadBook.id !== book.id),
                    read: currState.read.filter((readBook) => readBook.id !== book.id)
                }))
                break;
            case 'wantToRead':
                this.setState((currState) => ({
                    currentlyReading: currState.currentlyReading.filter((currentlyReadingBook) => currentlyReadingBook.id !== book.id),
                    wantToRead: currState.wantToRead.concat([book]),
                    read: currState.read.filter((readBook) => readBook.id !== book.id)
                }))
                break;
            case 'read':
                this.setState((currState) => ({
                    currentlyReading: currState.currentlyReading.filter((currentlyReadingBook) => currentlyReadingBook.id !== book.id),
                    wantToRead: currState.wantToRead.filter((wantToReadBook) => wantToReadBook.id !== book.id),
                    read: currState.read.concat([book])
                }))
                break;
            default:
                this.setState((currState) => ({
                    currentlyReading: currState.currentlyReading.filter((currentlyReadingBook) => currentlyReadingBook.id !== book.id),
                    wantToRead: currState.wantToRead.filter((wantToReadBook) => wantToReadBook.id !== book.id),
                    read: currState.read.filter((readBook) => readBook.id !== book.id)
                }))
                break;
        }
        BooksAPI.update(book, e.target.value);
    }


    searchBooks(event) {
        if (event.target.value.trim() !== '') {
            BooksAPI.search(event.target.value)
                .then((books) => {
                    let results_books = books.error ? [] : books;
                    if(results_books.length > 0) {
                        let updated_results = results_books.map((book) => {
                            var o = Object.assign({}, book);
                            if ((this.state.currentlyReading.filter((currentlyReading) => currentlyReading.id === o.id).length > 0)) {
                                o.shelf = 'currentlyReading';
                            } else if ((this.state.wantToRead.filter((wantToRead) => wantToRead.id === o.id).length > 0)) {
                                o.shelf = 'wantToRead';
                            } else if ((this.state.read.filter((read) => read.id === o.id).length > 0)) {
                                o.shelf = 'read';
                            } else {
                                o.shelf = 'none';
                            }
                            return o;
                        })

                        this.setState(() => ({
                            results: updated_results
                        }))
                    } else {
                        this.setState(() => ({
                            results: []
                        }))
                    }
                })
        } else {
            this.setState(() => ({
                results: []
            }))
        }
    }

    clearResults() {
        this.setState(() => ({
            results: []
        }))
    }

  render() {
    return (
      <div className="app">
          <Route exact path='/' render={() => (
              <Dashboard
                  currentlyReading={this.state.currentlyReading}
                  wantToRead={this.state.wantToRead}
                  read={this.state.read}
                  onChange={(a,b)=>this.onSelectionChanged(a,b)}
                  onSearchClicked={() => this.clearResults()}
              />
          )} />
          <Route path='/search' render={({ history }) => (
              <Search onTextChange={(e) => this.searchBooks(e)} onChange={(a,b)=>this.onSelectionChanged(a,b)} results={this.state.results}/>
          )} />
      </div>
    )
  }
}

export default BooksApp
