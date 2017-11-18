import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelfList from './BookShelfList'

class BookShelf extends Component {

    static propTypes = {
        books_list: PropTypes.array.isRequired,
        book_shelfs_list: PropTypes.array.isRequired,
        onChangeBookshelf: PropTypes.func.isRequired
    }

    
    render() {
        const { books_list, book_shelfs_list, onChangeBookshelf } = this.props
        let filteredBookShelfs = book_shelfs_list.filter((book_shelfs_list) => book_shelfs_list.isbookshelf === 1)

        return (
            
            <div className="list-books">
                {/* TODO: Main Title */}
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                    {
                        filteredBookShelfs.map((BookShelf) => (
                            
                            <div className="bookshelf" key={ BookShelf._id }>
                                <h2 className="bookshelf-title">{ BookShelf.name }</h2>
                                <div className="bookshelf-books">
                                    <BookShelfList 
                                        books_list={books_list}
                                        book_shelfs_list={book_shelfs_list}
                                        current_book_shelf={BookShelf.value}
                                        onChangeBookshelf={onChangeBookshelf}
                                    /> 
                                </div>
                            </div>
                        ))
                    }
                    </div>
                </div>
                {/* Search Books */}
                <div className="open-search">
                    <Link 
                        to="/search"
                    >Add a book</Link>
                </div>
            </div>
        )
    }
}

export default BookShelf
