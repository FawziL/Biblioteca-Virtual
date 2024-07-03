import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../services/Api';
import SearchBooks from '../../components/SearchBook/SearchBooks';
import SearchResults from '../../components/SearchResults/SearchResults';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Search = () => {
  const [books, setBooks] = useState([]);
  const query = useQuery();
  const searchTerm = query.get('query');

  useEffect(() => {
    const fetchBooks = async () => {
      if (searchTerm) {
        try {
          const response = await api.get('/books/searchBooks', { params: { query: searchTerm } });
          setBooks(response.data);
        } catch (error) {
          console.error('Error searching for books', error.response?.data || error.message);
        }
      }
    };

    fetchBooks();
  }, [searchTerm]);

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
