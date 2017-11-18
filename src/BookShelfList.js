import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelfList extends Component {

    static propTypes = {
        books_list: PropTypes.array.isRequired,
        book_shelfs_list: PropTypes.array.isRequired,
        current_book_shelf: PropTypes.string.isRequired,
        onChangeBookshelf: PropTypes.func.isRequired
    }

    render() {
        const { books_list, book_shelfs_list, current_book_shelf, onChangeBookshelf } = this.props

        let BookShelfswiseBooksList = books_list.filter((books_list) => books_list.shelf === current_book_shelf)
        
        return (
            <ol className="books-grid">
                {
                    BookShelfswiseBooksList.map((currentBookShelfBook) => (
                        <li key={ currentBookShelfBook.id }>
                            <Book key={ currentBookShelfBook.id }
                                book={ currentBookShelfBook }
                                book_shelfs_list={ book_shelfs_list }
                                current_book_shelf={ current_book_shelf }
                                onChangeBookshelf={ onChangeBookshelf }
                            />
                        </li>
                    ))
                }
            </ol>
        )
    }
}

export default BookShelfList
