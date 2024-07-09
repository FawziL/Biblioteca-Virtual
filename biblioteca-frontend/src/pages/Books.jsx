import React, { useState, useEffect } from 'react';
import SearchBooks from '../components/SearchBook/SearchBooks';
import SearchResultsAdmin from '../components/SearchResultsAdmin/SearchResultsAdmin';
import api from '../services/Api';
import { useLocation, useNavigate } from 'react-router-dom';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const BookList = () => {
  const [books, setBooks] = useState([]);
  const query = useQuery();
  const searchCategory = query.get('category');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      if (searchCategory) {
        try {
          const response = await api.get(`/books/category/${searchCategory}`);
          setBooks(response.data);
        } catch (error) {
          console.error('Error fetching books by category', error.response?.data || error.message);
        }
      }
    };

    fetchBooks();
  }, [searchCategory]);

  const handleSearchResults = (results) => {
    setBooks(results);
  };

  const handleCategoryChange = (category) => {
    const url = new URL(window.location);
    if (category) {
      url.searchParams.set('category', category);
      url.searchParams.delete('query');
    } else {
      url.searchParams.delete('category');
    }
    navigate(url.pathname + url.search);
  };

  return (
    <div>
      <SearchBooks onSearchResults={handleSearchResults} onCategoryChange={handleCategoryChange} />
      <SearchResultsAdmin books={books} />
    </div>
  );
};

export default BookList;
