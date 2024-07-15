import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/Api';
import SearchBooks from '../../components/SearchBook/SearchBooks';
import SearchResults from '../../components/SearchResults/SearchResults';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const Search = () => {
    const [books, setBooks] = useState([]);
    const [favoriteBooks, setFavoriteBooks] = useState([]);
    const query = useQuery();
    const searchTerm = query.get('query');
    const searchCategory = query.get('category');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            if (searchTerm) {
                try {
                    const response = await api.get('/books/searchBooks', { params: { query: searchTerm } });
                    setBooks(response.data);
                } catch (error) {
                    console.error('Error searching for books', error.response?.data || error.message);
                }
            } else if (searchCategory) {
                try {
                    const response = await api.get(`/books/category/${searchCategory}`);
                    setBooks(response.data);
                } catch (error) {
                    console.error('Error fetching books by category', error.response?.data || error.message);
                }
            }
        };

        const fetchFavoriteBooks = async () => {
            try {
                const response = await api.get('/favoriteBooks/getFavoriteBooks');
                setFavoriteBooks(response.data);
            } catch (error) {
                console.error('Error fetching favorite books', error.response?.data || error.message);
            }
        };

        fetchBooks();
        fetchFavoriteBooks();
    }, [searchTerm, searchCategory]);

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
        <div className='searchContainer'>
            <SearchBooks onSearchResults={handleSearchResults} onCategoryChange={handleCategoryChange} />
            <SearchResults books={books} favoriteBooks={favoriteBooks} />
        </div>
    );
};

export default Search;