import React, { useState } from 'react';
import SearchBooks from '../components/SearchBook/SearchBooks';
import SearchResultsAdmin from '../components/SearchResultsAdmin/SearchResultsAdmin';

const BookList = () => {
  const [books, setBooks] = useState([]);

  const handleSearchResults = (results) => {
    setBooks(results);
  };

  return (
    <div>
      <SearchBooks onSearchResults={handleSearchResults} />
      <SearchResultsAdmin books={books} />
    </div>
  );
};

export default BookList;
