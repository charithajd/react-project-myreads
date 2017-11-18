import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BooksSearchList extends Component {

    static propTypes = {
        searched_books_list: PropTypes.array.isRequired,
        myshelfs_books_list: PropTypes.array.isRequired,
        book_shelfs_list: PropTypes.array.isRequired,
        onChangeBookshelf: PropTypes.func.isRequired
    }

    render() {
        const { searched_books_list, myshelfs_books_list, book_shelfs_list, onChangeBookshelf } = this.props
        
        return (
            <ol className="books-grid">
                {
                    searched_books_list.map((searchedBook) => (
                        <li key={ searchedBook.id }>
                            <Book key={ searchedBook.id }
                                book={ searchedBook }
                                book_shelfs_list={ book_shelfs_list }
                                current_book_shelf={ (myshelfs_books_list.filter((myshelfs_books_list) => myshelfs_books_list.id === searchedBook.id).length > 0) ? myshelfs_books_list.filter((myshelfs_books_list) => myshelfs_books_list.id === searchedBook.id)[0].shelf : 'none' }
                                onChangeBookshelf={ onChangeBookshelf }
                            />
                        </li>
                    ))
                }
            </ol>
        )
    }
}

export default BooksSearchList
