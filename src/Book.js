import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        book_shelfs_list: PropTypes.array.isRequired,
        current_book_shelf: PropTypes.string.isRequired,
        onChangeBookshelf: PropTypes.func.isRequired
    }

    state = {
        book_object: '',
        current_book_shelf_value: ''
    }

    // TODO: At the initial state get selected book shelf value get from the props
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            book_object: props.book,
            current_book_shelf_value: props.current_book_shelf
        };
    }
    
    handleChange(event) {
        this.setState({current_book_shelf_value: event.target.value});

        let book = this.state.book_object
        let shelf = event.target.value
        this.props.onChangeBookshelf(book, shelf)
    }

    render() {
        const { book, book_shelfs_list } = this.props
        const { current_book_shelf_value } = this.state
        
        let book_authors = []
        // <!-- TODO: Validate props -->
        // <!-- TODO: Validate 'authors' is empty or not -->
        if (book.authors && book.authors.length > 0) {
            book_authors = book.authors
        }

        return (
            // <!-- TODO: Books Area -->
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + ((book.imageLinks && book.imageLinks.thumbnail) ? book.imageLinks.thumbnail : '') + ')' }}></div>

                    {/* TODO: Book Shelf Selecter */}
                    <div className="book-shelf-changer">
                        <select id="bookShelfsTypes"
                            value={current_book_shelf_value} onChange={this.handleChange}>
                            <option value="none" disabled>Move to...</option>
                            {
                                book_shelfs_list.map((bookshelf) => (
                                    <option key={ bookshelf._id }
                                    value={ bookshelf.value }>{ bookshelf.name }</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="book-title">{ book.title }</div>
                {
                     book_authors.map((author) => (
                         <div className="book-authors"  key={ author._id }>{ author }</div>
                     ))
                }
            </div>
        )
    }
}

export default Book
