import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'

class BooksApp extends Component {
  state = {
    books_list: [],
    book_shelfs: [
      {
        "value": "currentlyReading",
        "name": "Currently Reading",
        "isbookshelf": 1
      },
      {
        "value": "wantToRead",
        "name": "Want to Read",
        "isbookshelf": 1
      },
      {
        "value": "read",
        "name": "Read",
        "isbookshelf": 1
      },
      {
        "value": "none",
        "name": "None",
        "isbookshelf": 0
      }
    ]
  }

  getAllBooks() {
    
    BooksAPI.getAll().then((books_list) => {
      this.setState({ books_list })
    })
  }

  componentWillMount() {

    this.getAllBooks()
  }
   
  onChangeBookshelf = (book, shelf) => {
    
    BooksAPI.update(book, shelf).then((returnvalue) => {
      this.getAllBooks()
    })
  }

  
  render() {
    return (
      <div className="app">
        <div>    
          <Route exact path="/" render={() => (
            <BookShelf
              books_list={ this.state.books_list }
              book_shelfs_list={ this.state.book_shelfs }
              onChangeBookshelf={ this.onChangeBookshelf }
            />
          )}/>

         <Route path="/search" render={({ history }) => (
            <BookSearch
              books_list={ this.state.books_list }
              book_shelfs_list={ this.state.book_shelfs }
              onChangeBookshelf={(book, shelf) => {
                this.onChangeBookshelf(book, shelf)
                history.push('/')
              }}
            />
          )}/>
        </div>
      </div>
    )
  }
}

export default BooksApp
