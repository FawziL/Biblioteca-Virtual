import React, { useState } from 'react';
import SearchBooks from '../../components/SearchBook/SearchBooks';
import SearchResults from '../../components/SearchResults/SearchResults';

const Search = () => {
  const [books, setBooks] = useState([]);

  const handleSearchResults = (results) => {
    setBooks(results);
  };

  return (
    <div>
      <SearchBooks onSearchResults={handleSearchResults} />
      <SearchResults books={books} />
    </div>
  );
};

export default Search;
