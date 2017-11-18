import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import BooksSearchList from './BooksSearchList'

var typingTimer;               // timer identifier
var doneTypingInterval = 800;  // time in ms

class BookSearch extends Component {
  
    static propTypes = {
        books_list: PropTypes.array.isRequired,
        book_shelfs_list: PropTypes.array.isRequired,
        onChangeBookshelf: PropTypes.func.isRequired
    }

    state = {
      	search_query: '',
      	search_state: 0,	// 0 - Blank query, 1 - Have search results, 2 - Empty search, 3 - Search in progress 
   		searched_books_result: []
    }

    updateQuery = (query) => {
        
        let maxResults = 50
        
        // Using clearTimeout() and setTimeout() functions for execute API call after end of typing 
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
          
      		// <!-- TODO: Validate query param is empty or not -->
        	if (query) {
              	
              	this.setState({ search_state: 3 }) // Set a flag as 3 - Search in progress
            	BooksAPI.search(query, maxResults).then((books_results) => {

                	if (books_results.error && books_results.error === 'empty query') {
                      	this.setState({ search_query: query }) // Set a search query
                      	this.setState({ search_state: 2 }) // Set a flag as 2 - Empty search
                    	this.setState({ searched_books_result: [] }) // Empty query set empty array
                	}
                	else {
                      	this.setState({ search_state: 1 }) // Set a flag as 1 - Have search results
                    	this.setState({ searched_books_result: books_results }) // Search list set to . array
                	}
            	})
        	}
        	else {
              	this.setState({ search_state: 0 }) // Set a flag as 0 - Blank query
           		this.setState({ searched_books_result: [] }) // Empty query set empty array
        	}
        }, doneTypingInterval);
    }

    
    render() {
        const { books_list, book_shelfs_list, onChangeBookshelf } = this.props
        const { search_query, search_state, searched_books_result } = this.state
		
		var searchContent;
		// if 0 - Blank query or 1 - Have search results
		if (search_state === 0 || search_state === 1) {
  			searchContent = <BooksSearchList 
                        searched_books_list={searched_books_result}
                        myshelfs_books_list={books_list}                  
                        book_shelfs_list={book_shelfs_list}
                        onChangeBookshelf={onChangeBookshelf}
                    />;
		} 
		// if 2 - Empty search
		else if (search_state === 2) {
        	searchContent = <div className="empty-serach-message">Your search "{search_query}" did not match with any books</div>;
        }
		// if 3 - Search in progress
		else {
  			searchContent = <div className="loader-message">
          			<div class="loader">Searching...</div>
          		</div>;
		}

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" 
                        onChange={(event) => this.updateQuery(event.target.value)}
                        placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    {searchContent}
                </div>
            </div>
        )
    }
}

export default BookSearch
